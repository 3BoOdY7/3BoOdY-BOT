let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) {
            throw `*[❗تحذير❗] ادخل مشكلتك و بلاغك*\n\n*مثال:*\n*${usedPrefix + command} مرحباً سيدي، لدي مشكلة في ...*`;
        }
        if (text.length < 10) {
            throw `*[❗تحذير❗] البلاغ لا يقل عن عشرة أحرف*`;
        }
        if (text.length > 1000) {
            throw `*[❗تحذير❗] البلاغ لا يزيد عن ألف حرف*`;
        }

        let teks = `*❒═════[إبلاغ مهم]═════❒*\n*┬*\n*├❧ الرقم:* wa.me/${m.sender.split('@')[0]}\n*┴*\n*┬*\n*├❧ البلاغ:* ${text}\n*┴*`;
        
        // إرسال البلاغ إلى رقم محدد
        await conn.reply('201283419708@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] } });
        
        // إرسال نسخة أخرى من البلاغ إلى رقم آخر
        await conn.reply('48732079957@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] } });
        
        // تأكيد الاستلام للمستخدم
        m.reply(`*[ ✔️ ] تم الابلاغ بنجاح لكن ماتتوقع يرد ليك كل خراكان ماعجبك (بهظر) حرد ليك في اقرب وقت*`);
    } catch (err) {
        m.reply(err.toString());
    }
};

handler.help = ['reporte', 'request'].map(v => v + ' <teks>');
handler.tags = ['info'];
handler.command = /^(report|بلاغ|بلغ|ابلاغ|bug|report-owner|reportes)$/i;

export default handler;