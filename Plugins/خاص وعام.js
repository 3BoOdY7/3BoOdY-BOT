const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

const adminNumber = '+201283419708'; // الرقم الذي يحدد إذا كان البوت للخاص أو القروبات أو كلاهما
let botMode = 'both'; // 'اقفل خاص', 'اقفل عام', 'افتح في الاتنين'

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    const chat = await message.getChat();

    // تحقق إذا كان المرسل هو المدير
    if (message.from === adminNumber) {
        if (message.body.toLowerCase() === 'اقفل خاص') {
            botMode = 'private';
            message.reply('Bot is now set to private mode.');
        } else if (message.body.toLowerCase() === 'اقفل عام') {
            botMode = 'groups';
            message.reply('Bot is now set to groups mode.');
        } else if (message.body.toLowerCase() === 'افتح في الاتنين') {
            botMode = 'both';
            message.reply('Bot is now set to both private and groups mode.');
        }
    }

    // منع البوت من العمل في المحادثات الخاصة إذا كان في وضع القروبات والعكس صحيح
    if ((botMode === 'خاص' && chat.isGroup) || (botMode === 'قروبات' && !chat.isGroup)) {
        return;
    }

    // هنا يمكنك وضع وظائف البوت الأساسية
    // مثال:
    if (message.body === 'اوامر') {
        message.reply('البوت قافل هنا يحب🐦‍⬛');
    }
});

client.initialize();