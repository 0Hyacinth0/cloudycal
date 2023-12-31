document.addEventListener("DOMContentLoaded", function () {
    //数据表
    const gcdData = [
		{ time: "1.50s", level: 0, rate: "0" },
		{ time: "1.44s", level: 95, rate: "0.10%" },
		{ time: "1.38s", level: 4241, rate: "4.40%" },
		{ time: "1.31s", level: 8857, rate: "9.18%" },
		{ time: "1.25s", level: 13851, rate: "14.36%" },
		{ time: "1.19s", level: 19316, rate: "20.02%" },
	];

	const huiXueGuiZiData = [
		{ time: "2.44s", level: 0, rate: "0" },
		{ time: "2.25s", level: 95, rate: "0.10%" },
		{ time: "2.06s", level: 8104, rate: "8.40%" },
		{ time: "1.88s", level: 17620, rate: "18.26%" },
	];

	const huiXueYuHanData = [
		{ time: "1.88s", level: 0, rate: "0" },
		{ time: "1.69s", level: 9705, rate: "10.06%" },
		{ time: "1.50s", level: 23650, rate: "24.51%" },
	];

	const zuoXuanYouZhuanData = [
		{ time: "5.00s", level: 0, rate: "0" },
		{ time: "4.69s", level: 95, rate: "0.10%" },
		{ time: "4.38s", level: 6502, rate: "6.74%" },
		{ time: "4.06s", level: 13851, rate: "14.36%" },
		{ time: "3.75s", level: 22331, rate: "23.14%" },
	];

    // 获取表单元素
    const levelInput = document.getElementById("level");
    const timeInput = document.getElementById("time");
    const generateResultBtn = document.getElementById("generateResult");
	//定义函数
    function getGcdData(accelerationLevel) {
		console.log(gcdData[0].level)
        const result = gcdData.find((data) => data.level === accelerationLevel);
        if (result) {
            return result;
        }
        if (accelerationLevel < gcdData[0].level) {
            return gcdData[0];
        }
        if (accelerationLevel > gcdData[gcdData.length - 1].level) {
            return gcdData[gcdData.length - 1];
        }
        for (let i = 0; i < gcdData.length; i++) {
            if (accelerationLevel < gcdData[i].level) {
                return gcdData[i - 1];
            }
        }
    }

    function getHuiXueGuiZiData(accelerationLevel) {
        const result = huiXueGuiZiData.find(
            (data) => data.level === accelerationLevel
        );
        if (result) {
            return result;
        }
        if (accelerationLevel < huiXueGuiZiData[0].level) {
            return huiXueGuiZiData[0];
        }
        if (accelerationLevel > huiXueGuiZiData[huiXueGuiZiData.length - 1].level) {
            return huiXueGuiZiData[huiXueGuiZiData.length - 1];
        }
        for (let i = 0; i < huiXueGuiZiData.length; i++) {
            if (accelerationLevel < huiXueGuiZiData[i].level) {
                return huiXueGuiZiData[i - 1];
            }
        }
    }

    function getHuiXueYuHanData(accelerationLevel) {
        const result = huiXueYuHanData.find(
            (data) => data.level === accelerationLevel
        );
        if (result) {
            return result;
        }
        if (accelerationLevel < huiXueYuHanData[0].level) {
            return huiXueYuHanData[0];
        }
        if (accelerationLevel > huiXueYuHanData[huiXueYuHanData.length - 1].level) {
            return huiXueYuHanData[huiXueYuHanData.length - 1];
        }
        for (let i = 0; i < huiXueYuHanData.length; i++) {
            if (accelerationLevel < huiXueYuHanData[i].level) {
                return huiXueYuHanData[i - 1];
            }
        }
    }

    function getZuoXuanYouZhuanData(accelerationLevel) {
        const result = zuoXuanYouZhuanData.find(
            (data) => data.level === accelerationLevel
        );
        if (result) {
            return result;
        }
        if (accelerationLevel < zuoXuanYouZhuanData[0].level) {
            return zuoXuanYouZhuanData[0];
        }
        if (accelerationLevel > zuoXuanYouZhuanData[zuoXuanYouZhuanData.length - 1].level) {
            return zuoXuanYouZhuanData[zuoXuanYouZhuanData.length - 1];
        }
        for (let i = 0; i < zuoXuanYouZhuanData.length; i++) {
            if (accelerationLevel < zuoXuanYouZhuanData[i].level) {
                return zuoXuanYouZhuanData[i - 1];
            }
        }
    }


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

export  function displayResults() {
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