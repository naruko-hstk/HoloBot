module.exports = {
  name: 'welcome',
  description: 'Just tag',
  execute(member) {
    console.log('User ' + member.user.username + ' has joined the server!');
    var role = member.guild.roles.cache.find((role) => role.name == '訪客');
    member.roles.add(role);
  },
};
