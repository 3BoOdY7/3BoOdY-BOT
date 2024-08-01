const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Akinator = require('akinator.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

let akinatorSession = null;

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above with your WhatsApp.');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    try {
        if (message.body.toLowerCase() === 'لعبة') {
            akinatorSession = new Akinator('en');
            await akinatorSession.start();
            message.reply(formatQuestionAndAnswers(akinatorSession));
        } else if (akinatorSession && akinatorSession.progress < 95) {
            await akinatorSession.step(message.body);
            message.reply(formatQuestionAndAnswers(akinatorSession));
        } else if (akinatorSession && akinatorSession.progress >= 95) {
            await akinatorSession.win();
            message.reply('هل شخصيتك هي: ' + akinatorSession.answers[0].name + "؟");
            akinatorSession = null;
        } else {
            message.reply('أرسل "لعبة" لبدء لعب أكيناتور.');
        }
    } catch (error) {
        console.error('Error occurred:', error);
        message.reply('حدث خطأ أثناء معالجة الرسالة. يرجى المحاولة لاحقًا.');
    }
});

client.initialize();

function formatQuestionAndAnswers(session) {
    return session.question + "\n" + session.answers.map(a => a.name).join(", ");
}