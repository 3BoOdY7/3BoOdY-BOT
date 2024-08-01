import discord
import random
import os

# الحصول على توكن البوت من متغيرات البيئة (أضف التوكن في إعدادات Replit)
TOKEN = os.getenv('DISCORD_TOKEN')

# إعداد الكلاينت
intents = discord.Intents.default()
client = discord.Client(intents=intents)

# قائمة أسئلة كرة القدم
questions = [
    "من هو اللاعب الذي حصل على أكبر عدد من الكرات الذهبية؟",
    "في أي عام أقيمت أول بطولة كأس العالم لكرة القدم؟",
    "ما هو الفريق الذي حقق أكبر عدد من بطولات دوري أبطال أوروبا؟",
    "من هو هداف كأس العالم لعام 2018؟",
    "ما هو النادي الذي يُعرف بلقب الشياطين الحمر؟"
]

# قائمة الإجابات
answers = [
    "ليونيل ميسي",
    "1930",
    "ريال مدريد",
    "هاري كين",
    "مانشستر يونايتد"
]

@client.event
async def on_ready():
    print(f'لقد تم تسجيل الدخول كبوت {client.user}')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.lower() == '!سؤال':
        question = random.choice(questions)
        await message.channel.send(question)

    if message.content.lower().startswith('!إجابة'):
        user_answer = message.content[7:].strip()
        if user_answer in answers:
            await message.channel.send("إجابة صحيحة!")
        else:
            await message.channel.send("إجابة خاطئة، حاول مرة أخرى!")

# تشغيل البوت
client.run(TOKEN)