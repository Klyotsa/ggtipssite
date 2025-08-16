# GGTips Website - DigitalOcean Deployment Guide

## 🚀 Quick Start

This guide will help you deploy the GGTips website to DigitalOcean using Docker and GitHub Actions.

## 📋 Prerequisites

1. **DigitalOcean Account** with access to:
   - Droplets (VPS)
   - Container Registry
   - API Tokens

2. **GitHub Repository** with the project code

3. **Domain Name** (optional, for custom domain)

## 🔧 Setup Steps

### 1. Create DigitalOcean Droplet

1. Go to [DigitalOcean Console](https://cloud.digitalocean.com/)
2. Create a new Droplet:
   - **Choose an image**: Ubuntu 22.04 LTS
   - **Choose a plan**: Basic (1GB RAM, 1 vCPU minimum)
   - **Choose a datacenter region**: Choose closest to your users
   - **Authentication**: SSH key (recommended) or Password
   - **Finalize and create**

### 2. Setup Droplet

SSH into your droplet and run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again for group changes to take effect
exit
```

### 3. Create Container Registry

1. In DigitalOcean Console, go to **Container Registry**
2. Create a new registry named `ggtips`
3. Note the registry URL: `registry.digitalocean.com/ggtips`

### 4. Generate API Token

1. Go to **API** → **Tokens/Keys**
2. Generate new token with **Write** access
3. Copy the token (you'll need it for GitHub Secrets)

### 5. Setup GitHub Secrets

In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions** and add:

- `DIGITALOCEAN_ACCESS_TOKEN`: Your DigitalOcean API token
- `DIGITALOCEAN_HOST`: Your droplet's IP address
- `DIGITALOCEAN_USERNAME`: Username for SSH (usually `root`)
- `DIGITALOCEAN_SSH_KEY`: Your private SSH key content

### 6. Configure Firewall

On your droplet, configure UFW:

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### 7. Deploy

1. Push your code to the `main` branch
2. GitHub Actions will automatically:
   - Build the Docker image
   - Push to DigitalOcean Container Registry
   - Deploy to your droplet

## 🐳 Manual Deployment

If you prefer manual deployment:

```bash
# On your droplet
docker pull registry.digitalocean.com/ggtips/ggtips-frontend:latest
docker run -d --name ggtips-frontend -p 80:80 registry.digitalocean.com/ggtips/ggtips-frontend:latest
```

## 🔍 Monitoring

Check deployment status:

```bash
# View running containers
docker ps

# View logs
docker logs ggtips-frontend

# Check container health
curl http://localhost/health
```

## 🌐 Custom Domain (Optional)

1. **Add DNS Record**: Point your domain to your droplet's IP
2. **SSL Certificate**: Use Let's Encrypt with Certbot
3. **Update nginx.conf**: Add your domain to server_name

## 📁 Project Structure

```
├── Dockerfile              # Frontend container
├── nginx.conf             # Nginx configuration
├── docker-compose.yml     # Local development
├── backend/Dockerfile     # Backend container
├── .github/workflows/     # CI/CD pipelines
└── src/                   # React source code
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**: Check if another service is using port 80
2. **Permission denied**: Ensure Docker group permissions are set
3. **Build fails**: Check GitHub Actions logs for specific errors
4. **Container won't start**: Check Docker logs for error messages

### Useful Commands

```bash
# Restart deployment
docker restart ggtips-frontend

# View real-time logs
docker logs -f ggtips-frontend

# Access container shell
docker exec -it ggtips-frontend sh

# Check resource usage
docker stats
```

## 📞 Support

If you encounter issues:
1. Check the logs: `docker logs ggtips-frontend`
2. Verify GitHub Actions workflow
3. Check DigitalOcean Console for resource usage
4. Ensure all secrets are properly configured

## 🔄 Updates

The website will automatically update when you push to the `main` branch. Each push triggers:
1. New Docker image build
2. Push to container registry
3. Automatic deployment to your droplet
4. Zero-downtime updates

---

**Happy Deploying! 🎉**
