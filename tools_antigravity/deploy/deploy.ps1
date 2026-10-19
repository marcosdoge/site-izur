# Script de deploy automatizado para Oracle Cloud VM via ZeroTier (192.168.194.100)
$ErrorActionPreference = "Stop"

$SSH_KEY = "C:\Users\marco\.oci\oci_api_key.pem"
$SSH_USER = "ubuntu"
$SERVER_IP = "192.168.194.100"
$REMOTE_DIR = "/var/www/izur-site"
$LOCAL_DIR = "y:\Site Izur"

Write-Host ">>> Iniciando Deploy para Izur via ZeroTier ($SERVER_IP)..." -ForegroundColor Cyan

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

# 3. Recarregar Nginx com segurança
Write-Host ">>> Validando e recarregando Nginx..."
ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SSH_USER@$SERVER_IP" "
  sudo nginx -t && sudo systemctl reload nginx
"

Write-Host ">>> Deploy concluído com sucesso!" -ForegroundColor Green
