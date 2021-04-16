module.exports = {
  name: '餐點',
  description: '食物合輯',
  aliases: ['午餐ㄘ啥', '午餐吃啥', '午餐？', '午餐?', '晚餐ㄘ啥', '晚餐吃啥', '晚餐？', '晚餐?'],
  execute(msg, args, prefix, command, author, master) {
    const messages = [
      '拉麵',
      '烏龍麵',
      '燒肉飯',
      '牛丼',
      '寿司',
      '涼麵',
      '羊肉鍋',
      '茶泡飯',
      '鴨肉麵',
      '兔肉湯',
      '海龜湯',
      '吃土',
      '雪花冰',
      '自己',
      '橘子',
      '洋蔥',
      '飯糰',
      '排餐',
      '~~沒門，省這餐去課金~~',
      '西北風',
      '牛排',
      '咖哩飯',
      '拉麵',
      '炸豬排',
      '麥當勞',
      '雞排',
      '鹹酥雞',
      '青醬海鮮義大利麵',
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    msg.channel.send(randomMessage);
  },
};
