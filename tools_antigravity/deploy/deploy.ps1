# Script de deploy automatizado para Oracle Cloud VM (137.131.237.135)
$ErrorActionPreference = "Stop"

$SSH_KEY = "C:\Users\marco\.oci\oci_api_key.pem"
$SSH_USER = "ubuntu"
$SERVER_IP = "137.131.237.135"
$REMOTE_DIR = "/var/www/izur-site"
$LOCAL_DIR = "y:\Site Izur"

Write-Host ">>> Iniciando Deploy para Izur na Oracle Cloud ($SERVER_IP)..." -ForegroundColor Cyan

# 1. Preparar diretórios remotos e backup
Write-Host ">>> Preparando diretórios remotos e backup..."
ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SSH_USER@$SERVER_IP" "
  if [ -d $REMOTE_DIR ]; then
    sudo rm -rf ${REMOTE_DIR}.bak
    sudo cp -r $REMOTE_DIR ${REMOTE_DIR}.bak
  fi
  sudo mkdir -p ${REMOTE_DIR}/assets/images
  sudo chown -R ${SSH_USER}:${SSH_USER} $REMOTE_DIR
"

# 2. Copiar arquivos locais via SCP
Write-Host ">>> Enviando arquivos do site..."
scp -i $SSH_KEY -o StrictHostKeyChecking=no "$LOCAL_DIR\index.html" "$LOCAL_DIR\style.css" "$LOCAL_DIR\script.js" "${SSH_USER}@${SERVER_IP}:${REMOTE_DIR}/"
scp -i $SSH_KEY -o StrictHostKeyChecking=no "$LOCAL_DIR\assets\images\*" "${SSH_USER}@${SERVER_IP}:${REMOTE_DIR}/assets/images/"

# 3. Configurar e testar Nginx
Write-Host ">>> Configurando Virtual Host do Nginx..."
$nginxConfig = @"
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;
    root /var/www/izur-site;
    index index.html;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    location ~* \.(ico|css|js|gif|jpe?g|png|webp|woff2?|eot|ttf|svg)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files `$uri =404;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host `$host;
        proxy_cache_bypass `$http_upgrade;
    }

    location / {
        try_files `$uri `$uri/ /index.html;
    }
}
"@

$nginxTempFile = "tools_antigravity\nginx_izur.conf"
Set-Content -Path $nginxTempFile -Value $nginxConfig -Encoding UTF8
scp -i $SSH_KEY -o StrictHostKeyChecking=no $nginxTempFile "${SSH_USER}@${SERVER_IP}:/tmp/nginx_izur.conf"
Remove-Item -Path $nginxTempFile -Force

ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SSH_USER@$SERVER_IP" "
  sudo cp /tmp/nginx_izur.conf /etc/nginx/sites-available/default
  sudo nginx -t && sudo systemctl reload nginx
"

Write-Host ">>> Deploy e recarga do Nginx concluídos com sucesso!" -ForegroundColor Green
