const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// رقم الهاتف الذي يجب أن يسمح له بالأوامر
const allowedNumber = '+201283419708';

// الأوامر المسموح بها
const allowedCommands = ['/m', '/بلغ', '/صوره'];

// بيانات الاتصال بالواتساب
const client = new Client();

// حدث جاهزية الواتساب
client.on('ready', () => {
   console.log('Client is ready!');
});

// حدث استقبال الرسائل
client.on('message', async message => {
   // تحقق ما إذا كان رقم الهاتف مسموح به
   if (message.from == allowedNumber) {
       // تحقق ما إذا كانت الرسالة تحتوي على أمر مسموح به
       if (allowedCommands.includes(message.body.trim())) {
           // تنفيذ الأمر
           switch (message.body.trim()) {
               case '/بلغ':
                   message.reply('تم تنفيذ الأمر بلغ بنجاح!');
                   break;
               case '/m':
                   message.reply('تم تنفيذ الأمر m بنجاح!');
                   break;
               case '/command3':
                   message.reply('تم تنفيذ الأمر 3 بنجاح!');
                   break;
               default:
                   break;
           }
       } else {
           message.reply('عذراً، ليس لديك صلاحية لاستخدام هذا الأمر.');
       }
   } else {
       message.reply('عذراً، ليس لديك صلاحية لاستخدام الأوامر.');
   }
});

// حدث توليد رمز الاستجابة السريعة
client.on('qr', qr => {
   qrcode.generate(qr, { small: true });
});

// تسجيل الدخول إلى الواتساب
client.initialize();