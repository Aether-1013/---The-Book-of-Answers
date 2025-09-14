// 答案库
const answers = [
    "是的，这是正确的选择。",
    "目前还不是最佳时机。",
    "你应该相信自己的直觉。",
    "这个决定会给你带来惊喜。",
    "耐心等待，答案即将揭晓。",
    "向前看，不要回头。",
    "你需要更多的信息来做决定。",
    "这个问题的答案在于你的内心。",
    "积极的行动会带来积极的结果。",
    "现在是改变的好时机。",
    "保持开放的心态，机会即将来临。",
    "这个选择可能会改变你的生活。",
    "相信过程，结果会是美好的。",
    "不要急于下结论，再等等看。",
    "你已经准备好面对这个挑战了。",
    "有时候，放下比坚持更重要。",
    "这个决定需要更多的思考。",
    "跟随你的热情，它会指引你。",
    "答案可能不如过程重要。",
    "你会得到你应得的。",
    "这个问题的解决方法很简单，只是你还没看到。",
    "有时候，未知比已知更美好。",
    "相信自己，你已经知道答案了。",
    "不要害怕失败，它是成功的一部分。",
    "现在是投资自己的好时机。",
    "这个关系值得你付出努力。",
    "改变你的视角，你会看到不同的答案。",
    "耐心是美德，也是智慧。",
    "这个机会不会一直等着你。",
    "你的努力会得到回报的。",
    "放下过去，拥抱未来。",
    "这个决定需要勇气，但值得。",
    "有时候，等待是最好的选择。",
    "你需要更多的休息和反思。",
    "这个问题的答案会随着时间而改变。",
    "相信宇宙的安排，一切都是最好的选择。",
    "不要让恐惧阻止你前进。",
    "现在是学习新技能的好时机。",
    "你已经走了这么远，不要放弃。",
    "这个选择会打开新的门。",
    "听从你内心的声音，它不会骗你。",
    "有时候，最简单的答案就是最好的。",
    "这个决定会让你成长。",
    "保持乐观，好事即将发生。",
    "你需要冒险才能得到你想要的。",
    "这个问题的答案在你手中。",
    "现在是清理和整理的好时机。",
    "芙宁娜很可爱",
    "这个变化会带来新的机会。",
    "不要让别人的意见左右你的决定。"
];

// DOM元素
const bookCover = document.getElementById('book-cover');
const leftPage = document.getElementById('left-page');
const rightPage = document.getElementById('right-page');
const leftContent = document.getElementById('left-content');
const rightContent = document.getElementById('right-content');
const questionInput = document.getElementById('question-input');
const askButton = document.getElementById('ask-button');
const historyList = document.getElementById('history-list');
const animationContainer = document.getElementById('animation-container');

// 历史记录数组
let history = [];

// 初始化
function init() {
    // 绑定事件
    bookCover.addEventListener('click', openBook);
    askButton.addEventListener('click', handleAskQuestion);
    questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAskQuestion();
        }
    });
    
    // 加载历史记录
    loadHistory();
}

// 打开书本
function openBook() {
    // 书本封面翻转动画
    bookCover.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    bookCover.style.transform = 'rotateY(-180deg) scale(0.8)';
    bookCover.style.opacity = '0';
    
    // 显示书本内容
    setTimeout(() => {
        bookCover.style.display = 'none';
        
        // 初始化页面位置
        leftPage.style.opacity = '1';
        rightPage.style.opacity = '1';
        
        // 添加明显的翻书动画
        leftPage.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        leftPage.style.transform = 'rotateY(-30deg) translateX(-30px)';
        
        rightPage.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        rightPage.style.transform = 'rotateY(30deg) translateX(30px)';
        
        // 延迟恢复到正常位置
        setTimeout(() => {
            leftPage.style.transition = 'transform 0.5s ease';
            leftPage.style.transform = 'rotateY(-5deg) translateX(0)';
            
            rightPage.style.transition = 'transform 0.5s ease';
            rightPage.style.transform = 'rotateY(0deg) translateX(0)';
            
            // 提示输入问题
            leftContent.innerHTML = '<div class="question-prompt">请在下方输入你的问题，然后点击"获取答案"按钮</div>';
            
            // 显示问题输入区域
            document.querySelector('.question-container').style.opacity = '1';
        }, 800);
    }, 800);
}

// 处理提问
function handleAskQuestion() {
    const question = questionInput.value.trim();
    
    if (!question) {
        showNotification('请输入你的问题', 'warning');
        return;
    }
    
    // 清空输入框
    questionInput.value = '';
    
    // 显示翻页动画
    flipPage(question);
}

// 页面翻转动画
function flipPage(question) {
    // 重置页面样式
    leftPage.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
    rightPage.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // 更新左页为问题
    leftPage.style.transform = 'rotateY(-15deg)';
    leftContent.innerHTML = `<div class="question-prompt">${question}</div>`;
    
    // 第一阶段：右页翻起
    rightPage.style.transform = 'rotateY(90deg) translateX(50%)';
    
    // 第二阶段：翻到背面
    setTimeout(() => {
        // 隐藏内容，模拟翻页到背面
        rightContent.style.visibility = 'hidden';
        
        // 翻到180度
        rightPage.style.transition = 'transform 0.5s ease';
        rightPage.style.transform = 'rotateY(180deg) translateX(100%)';
        
        // 更新内容
        setTimeout(() => {
            // 获取随机答案
            const answer = getRandomAnswer();
            
            // 更新内容
            rightContent.innerHTML = `<div class="answer">${answer}</div>`;
            
            // 保存到历史记录
            saveToHistory(question, answer);
            
            // 第三阶段：翻回正面
            rightPage.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1.5)';
            rightPage.style.transform = 'rotateY(0deg) translateX(0)';
            
            // 显示内容
            rightContent.style.visibility = 'visible';
            
            // 添加答案出现动画
            createConfetti();
            
            // 恢复页面位置
            setTimeout(() => {
                leftPage.style.transition = 'transform 0.5s ease';
                leftPage.style.transform = 'rotateY(-5deg)';
            }, 1000);
        }, 300);
    }, 800);
}

// 获取随机答案
function getRandomAnswer() {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
}

// 创建庆祝效果
function createConfetti() {
    // 清空容器
    animationContainer.innerHTML = '';
    
    // 创建100个庆祝元素
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        
        // 随机大小和位置
        const size = Math.random() * 10 + 5;
        const color = getRandomColor();
        
        confetti.style.position = 'absolute';
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * -100}px`;
        confetti.style.borderRadius = '50%';
        confetti.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
        
        // 随机动画延迟和持续时间
        const delay = Math.random() * 3;
        const duration = Math.random() * 5 + 10; // 延长持续时间，让粒子有足够时间落出屏幕
        const rotation = Math.random() * 360;
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        confetti.style.animation = `confetti ${duration}s ease-in ${delay}s forwards`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.animationTimingFunction = `cubic-bezier(${0.1 + Math.random() * 0.2}, ${0.1 + Math.random() * 0.2}, ${0.7 + Math.random() * 0.3}, ${0.7 + Math.random() * 0.3})`;
        
        animationContainer.appendChild(confetti);
    }
    
    // 不再强制清除粒子，让它们自然落出屏幕
}

// 获取随机颜色
function getRandomColor() {
    const colors = ['#1a5fb4', '#007bff', '#3498db', '#5dade2', '#85c1e9', '#aed6f1', '#d6eaf8'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 保存到历史记录
function saveToHistory(question, answer) {
    const timestamp = new Date().toLocaleString();
    const historyItem = { question, answer, timestamp };
    
    // 添加到数组开头
    history.unshift(historyItem);
    
    // 限制历史记录数量为10条
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    // 更新历史记录显示
    updateHistoryDisplay();
}

// 加载历史记录（不从本地存储加载，刷新后历史记录将消失）
function loadHistory() {
    // 清空历史记录数组
    history = [];
    
    // 更新历史记录显示
    updateHistoryDisplay();
}

// 更新历史记录显示
function updateHistoryDisplay() {
    historyList.innerHTML = '';
    
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        historyItem.innerHTML = `
            <div class="history-question">问：${item.question}</div>
            <div class="history-answer">答：${item.answer}</div>
            <div class="history-time">${item.timestamp}</div>
        `;
        
        historyList.appendChild(historyItem);
    });
    
    // 如果没有历史记录，显示提示
    if (history.length === 0) {
        historyList.innerHTML = '<div class="history-empty">暂无历史记录</div>';
    }
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '5px';
    notification.style.color = '#fff';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '10000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    notification.style.transform = 'translateX(100%)';
    
    // 设置背景色
    if (type === 'warning') {
        notification.style.backgroundColor = '#ff9800';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
    } else {
        notification.style.backgroundColor = '#1a5fb4';
    }
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // 3秒后隐藏通知
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        // 移除元素
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加额外的CSS样式
function addAdditionalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .history-empty {
            color: #999;
            font-style: italic;
            text-align: center;
            padding: 20px;
        }
        
        .history-time {
            font-size: 0.8rem;
            color: #999;
            margin-top: 5px;
        }
        
        /* 滚动条样式 */
        .history-list::-webkit-scrollbar {
            width: 6px;
        }
        
        .history-list::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }
        
        .history-list::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
        }
        
        .history-list::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }
        
        /* 初始隐藏问题输入区域 */
        .question-container {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        /* 页面加载动画 */
        @keyframes pageLoad {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .page {
            opacity: 0;
            animation: pageLoad 0.5s ease forwards;
            animation-delay: 0.8s;
        }
    `;
    
    document.head.appendChild(style);
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
    addAdditionalStyles();
    init();
});