import nodemailer from 'nodemailer';

const emailResetPass = async ( payload ) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    const { email, name, lastname, token } = payload;

    const admin = {
      email: 'admin@gmail.com',
      name: 'Renato 👻',
      subject: 'Reestablecer contraseña en Centro Veterinario',
      title: 'Reestablecer contraseña',
      company: 'Centro Veterinario',
      submit: 'Reestablecer contraseña'
    }
    const sendEmail = await transporter.sendMail({
      from: `"${admin.name}" <${admin.email}>`,
      to: email,
      subject: admin.subject,
      html: `
        <!DOCTYPE html>
        <html lang="es" style=" box-sizing: border-box; padding: 0; margin: 0;">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${admin.title}</title>
            <style>
            @media screen and (max-width: 450px) {
                img.image__header {
                width: 15rem !important; 
                }
            }
            </style>
        </head>
        <body style="background: radial-gradient(circle, rgba(120,172,252,1) 0%, rgba(148,214,233,1) 100%); font-family: Poppins, sans-serif; padding: 3rem 1rem; margin: 0;"
        >
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: calc(100vh - 3rem);">
            <div style="background-color: #1B1B1B; color: aliceblue; max-width: 28rem; border-radius: .5rem; padding: 1rem 2rem;">
        
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; "> <!-- Header -->
                <h1 style="font-size: 1.3rem; text-align: center; text-transform: uppercase;">${admin.title}</h1>
        
                <img class="image__header" style="display: block; object-fit: cover; width: 20rem; border-radius: 50%;" src="https://res.cloudinary.com/projeccts-reacct/image/upload/v1678231323/Images/jzw7c6jzucdjuedbx3ni.png" alt="">
                </div>  <!-- End Header -->
        
                <div style="background-image: url(https://zsfpcx.stripocdn.email/content/guids/CABINET_9aa36f49cdb5185ad35ee0f7a5c7d9380ade3ae69ada3493ecaa145d1284bee9/images/group_347_1.png); background-size: cover; background-position: center; background-repeat: no-repeat; border: .1rem solid #62A2EF; border-radius: .5rem; padding: 0 1rem;"> <!-- Body -->
                <p>Estimado/a <span style="font-weight: bold; font-size: 1.3rem;">${name} ${lastname} ,</span></p>
                <p>>Hemos recibido su solicitud para reestablecer su contraseña en nuestro sitio web <span style="font-weight: bold; font-size: 1.1rem;">${admin.company}</span></p>
                <p>Para continuar con el proceso de reestablecimiento de contraseña, <span style="color: #FFF;">haga click en el siguiente enlace :</span></p>
        
                <a href="${process.env.FRONTEND_URI}/reset-password/${token}" target="_blank" style="padding: 1rem; text-align: center; display: block; color: #f1f1f1; background-color: #62A2EF;text-decoration: none; border-radius: 5rem; margin-bottom: 1rem;">${admin.submit}</a>
                </div>  <!-- End Body -->
        
                <div style="margin-top: 1.5rem; line-height: 1.8;">
                <p style="margin: 0;">Atentamente,</p>
                <p style="font-weight: 700; margin: 0;">El equipo de Centro Veterinario</p>
                </div>
            </div>
        
            <div style="display: flex; flex-direction: column; margin-top: 1.5rem; color: #333333; text-align: center; font-size: .9rem;">
                <small style="font-weight: 600;">Si tu no creaste esta cuenta, puedes ignorar este mensaje.</small>
                <small>Copyright © 2023 <span style="font-weight: 800;">${admin.company}</span>, Todos los derechos reservados.</small>
            </div>
            </div>
        </body>
        </html>
      `,
    });
    console.log(`Message sent: ${sendEmail.messageId}`);
  } catch ( error ) {
    console.log(error);
  }
}

export default emailResetPass;