document.addEventListener('DOMContentLoaded', function () {
    // 从 tableData.js 导入数据
    const { gcdData, huiXueGuiZiData, huiXueYuHanData, zuoXuanYouZhuanData } = require('./tableData');

    // 获取表单元素
    const levelInput = document.getElementById('level');
    const timeInput = document.getElementById('time');
    const generateResultBtn = document.getElementById('generateResult');
    const resultContainer = document.getElementById('resultContainer');

    // 计算逻辑示例
    function calculateEffectiveSkillCount(level, time) {
        return level * (time / 2);
    }

    // 按钮点击事件
    generateResultBtn.addEventListener('click', function (event) {
        event.preventDefault();

        if (levelInput.value === '' || timeInput.value === '') {
            alert('请填写所有字段');
            return;
        }

        // 计算结果
        const level = parseInt(levelInput.value);
        const time = parseFloat(timeInput.value);
        const effectiveSkillCount = calculateEffectiveSkillCount(level, time);

        // 将计算结果显示给用户
        resultContainer.innerHTML = `
      <h2>计算结果</h2>
      <p>加速等级：${level}</p>
      <p>战斗时长：${time} 秒</p>
      <p>技能有效次数：${effectiveSkillCount}</p>
    `;
    });
});
