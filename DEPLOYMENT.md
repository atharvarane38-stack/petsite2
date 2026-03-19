# PetSite - Deployment Guide

## Production Deployment Checklist

### Pre-Deployment

- [ ] All environment variables configured
- [ ] Database backups created
- [ ] Security review completed
- [ ] SSL certificates obtained
- [ ] Domain configured
- [ ] API rate limiting configured

### Backend Deployment

#### Using Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create app
heroku create petsite-api

# Set environment variables
heroku config:set DB_HOST=your_db_host
heroku config:set DB_NAME=petsite_db
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

#### Using AWS EC2

```bash
# SSH into instance
ssh -i key.pem ubuntu@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone your-repo-url
cd petsite/backend

# Install dependencies
npm install --production

# Configure PM2
npm install -g pm2
pm2 start src/server.js --name petsite-api

# Configure nginx as reverse proxy
# (Additional nginx configuration needed)
```

### Frontend Deployment

#### Web Deployment

```bash
cd web
npm run build
# Deploy 'build' folder to:
# - Netlify (drag & drop)
# - Vercel (git push)
# - AWS S3 + CloudFront
# - GitHub Pages
```

#### Mobile App

```bash
# iOS
cd mobile
npm run ios -- --release
# Submit to App Store

# Android
npm run android -- --release
# Submit to Google Play Store
```

### Database Deployment

1. Create managed PostgreSQL instance:
   - AWS RDS
   - DigitalOcean Managed Databases
   - Heroku Postgres

2. Run migrations:
```bash
# Using Sequelize CLI
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### Monitoring & Maintenance

- Set up error logging (Sentry)
- Configure performance monitoring (New Relic)
- Set up automated backups
- Configure alerts for downtime
- Monitor server health

### Security

- Enable HTTPS/SSL
- Configure CORS properly
- Set secure headers
- Enable rate limiting
- Regular security audits
- Keep dependencies updated

```bash
# Check for vulnerabilities
npm audit

# Update packages
npm audit fix
```

### Scaling

As user base grows:

1. Database optimization
   - Add indexing
   - Archive old data
   - Implement caching (Redis)

2. Application scaling
   - Load balancing
   - Horizontal scaling
   - CDN for static assets

3. API optimization
   - Implement pagination
   - Add caching headers
   - Use API versioning

## Environment Variables for Production

```env
NODE_ENV=production
DB_HOST=prod-db-host
DB_PORT=5432
DB_NAME=petsite_prod
DB_USER=prod_user
DB_PASSWORD=strong_password_here
JWT_SECRET=very_long_random_secret_key
JWT_EXPIRY=30d
STRIPE_SECRET_KEY=sk_live_key
STRIPE_PUBLISHABLE_KEY=pk_live_key
BACKEND_URL=https://api.petsite.com
FRONTEND_URL=https://petsite.com
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=noreply@petsite.com
EMAIL_PASSWORD=app_specific_password
```

## Rollback Procedure

If deployment causes issues:

```bash
# Revert to previous version
git revert HEAD
git push

# Or use zero-downtime deployment
# - Keep previous version running
# - Gradually switch traffic
# - Monitor for issues
# - Complete switch or rollback
```

## Support

For deployment issues: devops@petsite.in
