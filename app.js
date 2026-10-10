const email = window.ALICIA_CONFIG?.contactEmail?.trim() || '';
const form = document.querySelector('#enquiry');
const status = document.querySelector('#form-status');
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
document.querySelector('#year').textContent = new Date().getFullYear();
const messages = {
 en: {note:'This opens your email app with a prepared message. Nothing is sent automatically. Please do not include sensitive financial documents.',offline:'Enquiry delivery is not connected yet. You can prepare and download your message; it will not be sent.',emailButton:'Prepare my email',downloadButton:'Prepare my enquiry',draft:'Your email draft is ready in your email app. Review it and press Send there. If your app did not open, use the email address alongside this form.',downloaded:'Your enquiry has been downloaded. It has not been sent. Contact delivery will be available once the business email is connected.',subject:'My plans for a home in Spain',hello:'Hello Olesia,',name:'My name is',email:'My email',plan:'My plans',end:'I would like to discuss my mortgage options in Spain.'},
 es: {note:'Se abrirá tu aplicación de correo con un mensaje preparado. No se envía nada automáticamente. No incluyas documentos financieros sensibles.',offline:'El envío de consultas aún no está conectado. Puedes preparar y descargar tu mensaje; no se enviará.',emailButton:'Preparar mi correo',downloadButton:'Preparar mi consulta',draft:'Tu borrador está preparado en tu aplicación de correo. Revísalo y pulsa Enviar allí. Si no se ha abierto, utiliza la dirección de correo junto al formulario.',downloaded:'Tu consulta se ha descargado. No se ha enviado. El envío estará disponible cuando se conecte el correo de contacto.',subject:'Mis planes para un hogar en España',hello:'Hola Olesia:',name:'Me llamo',email:'Mi correo',plan:'Mis planes',end:'Me gustaría hablar de mis opciones hipotecarias en España.'},
 uk: {note:'Відкриється ваша поштова програма з підготовленим листом. Нічого не надсилається автоматично. Не додавайте конфіденційні фінансові документи.',offline:'Надсилання звернень ще не підключено. Ви можете підготувати й завантажити повідомлення; його не буде надіслано.',emailButton:'Підготувати лист',downloadButton:'Підготувати звернення',draft:'Чернетка готова у вашій поштовій програмі. Перевірте її та натисніть «Надіслати» там. Якщо програма не відкрилася, скористайтеся адресою біля форми.',downloaded:'Ваше звернення завантажено. Його не надіслано. Надсилання стане доступним після підключення контактної пошти.',subject:'Мої плани щодо дому в Іспанії',hello:'Вітаю, Олесю!',name:'Мене звати',email:'Моя пошта',plan:'Мої плани',end:'Хочу обговорити свої іпотечні можливості в Іспанії.'}
};
const current = () => messages[window.ALICIA_LANGUAGE || 'en'];
function updateFormLanguage(){const t=current();document.querySelector('#contact-note').textContent=validEmail?t.note:t.offline;document.querySelector('#submit-button').textContent=validEmail?t.emailButton:t.downloadButton;status.textContent='';}
window.addEventListener('alicia-language-change',updateFormLanguage);
updateFormLanguage();
if (validEmail) {const direct=document.querySelector('.contact-direct');const link=document.createElement('a');link.href='mailto:'+email;link.textContent=email;direct.append(link);direct.hidden=false;}
form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const data=new FormData(form), t=current();
 const body=`${t.hello}\n\n${t.name} ${data.get('name')}.\n${t.email}: ${data.get('email')}\n${t.plan}: ${data.get('plan')}\n\n${data.get('message')}\n\n${t.end}`;
 if(validEmail){window.location.href=`mailto:${email}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(body)}`;status.textContent=t.draft;}
 else{const url=URL.createObjectURL(new Blob([body],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='my-alicia-mortgage-enquiry.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent=t.downloaded;}
});
