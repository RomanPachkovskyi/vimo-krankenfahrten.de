#!/usr/bin/env python3
import os
from ftplib import FTP, FTP_TLS
from pathlib import Path


def parse_env(path: Path) -> dict:
    config = {}
    with path.open() as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            value = value.strip().strip("\"'")
            config[key.strip()] = value
    return config


def env_flag(value: str) -> bool:
    return str(value).strip().lower() in {"1", "true", "yes", "on"}


def ensure_remote_dirs(ftp, rel_dir: str) -> None:
    if not rel_dir:
        return
    current = ""
    for part in rel_dir.split("/"):
        current = f"{current}/{part}" if current else part
        try:
            ftp.mkd(current)
        except Exception:
            pass


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    env_path = root / ".env"
    if not env_path.exists():
        raise SystemExit("Missing .env (expected at project root).")

    config = parse_env(env_path)
    host = config.get("FTP_HOST")
    user = config.get("FTP_USER")
    passwd = config.get("FTP_PASS")
    port = int(config.get("FTP_PORT", "21"))
    use_tls = env_flag(config.get("FTP_SSL", "false"))
    remote_root = config.get("FTP_ROOT", ".").strip() or "."

    if not host or not user or not passwd:
        raise SystemExit("Missing FTP_HOST/FTP_USER/FTP_PASS in .env")
    if not use_tls:
        raise SystemExit("Insecure FTP is blocked. Enable FTPS via FTP_SSL=true.")

    local_root = root / "dist"
    if not local_root.exists():
        raise SystemExit("dist/ not found; run build first")

    ftp = FTP_TLS() if use_tls else FTP()
    ftp.connect(host, port, timeout=30)
    if use_tls:
        ftp.auth()
    ftp.login(user, passwd)
    if use_tls:
        ftp.prot_p()
    ftp.set_pasv(True)

    try:
        ftp.cwd(remote_root)
    except Exception:
        parts = [p for p in remote_root.split("/") if p]
        for part in parts:
            try:
                ftp.mkd(part)
            except Exception:
                pass
            ftp.cwd(part)

    base = str(local_root)
    for dirpath, _, filenames in os.walk(local_root):
        rel_dir = os.path.relpath(dirpath, base)
        rel_dir = "" if rel_dir == "." else rel_dir.replace(os.sep, "/")
        ensure_remote_dirs(ftp, rel_dir)
        for name in filenames:
            local_file = Path(dirpath) / name
            remote_path = f"{rel_dir}/{name}" if rel_dir else name
            with local_file.open("rb") as f:
                ftp.storbinary(f"STOR {remote_path}", f)

    ftp.quit()
    print("Upload complete.")


if __name__ == "__main__":
    main()
