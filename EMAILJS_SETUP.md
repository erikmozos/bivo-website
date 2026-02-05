# EmailJS Setup Guide

## 📧 How to Configure EmailJS for the Contact Form

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

### Step 2: Connect Your Email Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended)
   - **Outlook**
   - **Yahoo**
   - Or any other SMTP service
4. Follow the setup instructions and test the connection

### Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: Nuevo mensaje de contacto desde Bivo - {{from_name}}

Hola,

Has recibido un nuevo mensaje de contacto desde la web de Bivo:

Nombre: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de bivotraining.com
```

4. **Template Variables to use:**
   - `{{from_name}}` - Nombre del usuario
   - `{{from_email}}` - Email del usuario  
   - `{{message}}` - Mensaje del usuario
   - `{{to_email}}` - Tu email (hello@bivotraining.com)

5. Set the **To Email** to: `hello@bivotraining.com`
   - ⚠️ **IMPORTANTE**: Este es el campo que determina a dónde llegan los emails realmente
   - Si actualmente está configurado como `lluis@bivotraining.com`, cámbialo a `hello@bivotraining.com`
6. Save the template and note the **Template ID**

### Step 4: Get Your Credentials
1. **Service ID**: Found in Email Services section
2. **Template ID**: Found in Email Templates section  
3. **Public Key**: Go to Account → API Keys → Public Key

### Step 5: Update Environment Variables
Edit the `.env.local` file in your project root:

```bash
# Replace with your actual EmailJS credentials
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 6: Restart Development Server
```bash
npm run dev
```

## ✅ Testing

1. Fill out the contact form on your website
2. You should receive an email at `hello@bivotraining.com`
3. Check the EmailJS dashboard for send statistics

## 🔒 Security Notes

- The Public Key is safe to expose in frontend code
- EmailJS handles rate limiting automatically
- Free tier includes 200 emails/month
- Upgrade plans available if you need more volume

## 🆘 Troubleshooting

**"EmailJS no está configurado correctamente"**
- Check that all environment variables are set correctly
- Restart the development server after changing .env.local

**Form submits but no email received**
- Verify the template ID is correct
- Check EmailJS dashboard for error logs
- Ensure email service is properly connected

**Need help?**
- EmailJS Documentation: https://www.emailjs.com/docs/
- Check the browser console for detailed error messages 