module.exports = {
  name: '餐點',
  description: '食物合輯',
  execute(msg) {
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
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    msg.channel.send(randomMessage);
  },
};
