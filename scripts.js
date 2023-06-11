document.addEventListener("DOMContentLoaded", function () {
    // 从 tableData.js 导入数据
    const {
        gcdData,
        huiXueGuiZiData,
        huiXueYuHanData,
        zuoXuanYouZhuanData,
    } = require("./tableData");

    // 获取表单元素
    const levelInput = document.getElementById("level");
    const timeInput = document.getElementById("time");
    const generateResultBtn = document.getElementById("generateResult");

    // 计算逻辑
    function showResults(accelerationLevel, battleDuration) {
        const gcdData = getGcdData(accelerationLevel);
        const huiXueGuiZiData = getHuiXueGuiZiData(accelerationLevel);
        const huiXueYuHanData = getHuiXueYuHanData(accelerationLevel);
        const zuoXuanYouZhuanData = getZuoXuanYouZhuanData(accelerationLevel);

        const leftRotationCount = Math.ceil(battleDuration / 45);
        const effectiveBattleDuration = battleDuration - leftRotationCount * zuoXuanYouZhuanData.time;
        const huiXuePerSecond = parseFloat((3 / huiXueGuiZiData.time).toFixed(1));
        const huiXueEffectiveCount = effectiveBattleDuration * huiXuePerSecond * 6;

        const resultData = {
            accelerationLevel,
            gcdData,
            huiXueGuiZiData,
            huiXueYuHanData,
            zuoXuanYouZhuanData,
            leftRotationCount,
            effectiveBattleDuration,
            huiXuePerSecond,
            huiXueEffectiveCount,
        };

        sessionStorage.setItem("resultData", JSON.stringify(resultData));
        window.location.href = "result.html";
    }

    // 按钮点击事件
    generateResultBtn.addEventListener("click", function (event) {
        event.preventDefault();

        if (levelInput.value === "" || timeInput.value === "") {
            alert("请填写所有字段");
            return;
        }

        // 调用 showResults 函数并传入正确的参数
        showResults(parseInt(levelInput.value), parseInt(timeInput.value));
    });
});

function displayResults() {
    // 获取结果
    const resultData = JSON.parse(sessionStorage.getItem("resultData"));

    // 检查结果是否存在
    if (!resultData) {
        alert("无法获取计算结果，请返回重新输入数据。");
        goBack();
        return;
    }

    // 获取结果容器
    const resultsContainer = document.getElementById("results_container");

    // 显示结果
    resultsContainer.innerHTML = `
        <h2>当前对应加速阈值</h2>
        <p>gcd</p>
        <p>读条时间=${resultData.gcdData.time}s，达到加速阈值=${resultData.gcdData.threshold}，达到加速率=${resultData.gcdData.rate}%</p>
        <p>回雪飘摇（瑰姿）</p>
        <p>引导时间=${resultData.huiXueGuiZiData.time}s，达到加速阈值=${resultData.huiXueGuiZiData.threshold}，达到加速率=${resultData.huiXueGuiZiData.rate}%</p>
        <p>回雪飘摇（余寒）</p>
        <p>引导时间=${resultData.huiXueYuHanData.time}s，达到加速阈值=${resultData.huiXueYuHanData.threshold}，达到加速率=${resultData.huiXueYuHanData.rate}%</p>
        <p>左旋右转</p>
        <p>引导时间=${resultData.zuoXuanYouZhuanData.time}s，达到加速阈值=${resultData.zuoXuanYouZhuanData.threshold}，达到加速率=${resultData.zuoXuanYouZhuanData.rate}%</p>
        
        <h2>回雪理论有效数量（瑰姿）</h2>
        <p>左旋右转次数：${resultData.leftRotationCount}</p>
        <p>有效战斗时长（总时长除去左旋右转时间，单位：秒）：${resultData.effectiveBattleDuration}</p>
        <p>回雪理论每秒：${resultData.huiXuePerSecond}</p>
        <p>回雪有效数量：${resultData.huiXueEffectiveCount}
    `;
}

function goBack() {
    window.location.href = "index.html";
}