const questions = [
    {
        type: "mcq",
        question: "1. تُعرّف استراتيجية 'خريطة المفاهيم' بأنها أداة تصوير تُستخدم لـ:",
        options: [
            "سرد المعلومات النصية بطريقة تقليدية مطولة.",
            "تمثيل العلاقات بين المفاهيم والأفكار في شكل خريطة تخطيطية.",
            "الحفظ والتذكر العشوائي للمعلومات دون فهم.",
            "تلخيص الروايات الأدبية والقصص التاريخية فقط."
        ],
        correct: 1
    },
    {
        type: "mcq",
        question: "2. ما هو الشكل الأنسب والأكثر ملاءمة للاستخدام في الموضوعات الإبداعية وحالات العصف الذهني؟",
        options: [
            "خريطة المفاهيم الهرمية.",
            "خريطة المفاهيم الانسيابية.",
            "خريطة المفاهيم العنكبوتية.",
            "الخريطة الجدولية الخطية."
        ],
        correct: 2
    },
    {
        type: "mcq",
        question: "3. تتألف خريطة المفاهيم الرئيسية من ثلاثة مكونات رئيسية تعمل معاً، وهي:",
        options: [
            "المفاهيم، المفاهيم الرئيسية والفرعية، الروابط أو العلاقات.",
            "المقدمة، العرض، الخاتمة.",
            "الأهداف، الوسائل، التقويم.",
            "العبارات، الأرقام، الجداول البيانية."
        ],
        correct: 0
    },
    {
        type: "mcq",
        question: "4. أي من أنواع خرائط المفاهيم يُعد الأشكال الأكثر شيوعاً واستخداماً في الأبحاث العلمية والعملية التعليمية؟",
        options: [
            "خريطة المفاهيم العنكبوتية.",
            "خريطة المفاهيم الهرمية.",
            "خريطة المفاهيم الانسيابية المعقدة.",
            "خريطة المفاهيم العشوائية."
        ],
        correct: 1
    },
    {
        type: "tf",
        question: "5. (صح / خطأ) تُعد خريطة المفاهيم الانسيابية شكلاً معقداً نسبياً يشمل ربط العنصر الواحد بأكثر من رابط لمفاهيم أخرى.",
        options: ["صح", "خطأ"],
        correct: 0
    },
    {
        type: "tf",
        question: "6. (صح / خطأ) تعتمد خريطة المفاهيم العنكبوتية على تنظيم هرمي توضع فيه المفاهيم الرئيسية في القمة وتتفرع للأسفل.",
        options: ["صح", "خطأ"],
        correct: 1
    },
    {
        type: "essay",
        question: "7. سؤال التحدي المقالي: اشرح باختصار الخطوات المنهجية الصحيحة لتصميم خريطة مفاهيم فعالة لموضوع دراسي.",
        modelAnswer: "<b>الإجابة النموذجية:</b><br>1. تحديد الموضوع المراد إنشاء الخريطة له.<br>2. اختيار المفاهيم الرئيسية وكتابتها في الأعلى أو الوسط.<br>3. إضافة المفاهيم الفرعية والمتفرعة.<br>4. ربط المفاهيم بأسهم أو خطوط مع تحديد كلمات الربط.<br>5. استخدام الألوان والرموز للتمييز.<br>6. مراجعة وتحسين بنية الخريطة."
    }
];

let currentIndex = 0;
let score = 0;

function renderQuestion() {
    const quizBody = document.getElementById("quiz-body");
    const progress = document.getElementById("progress");
    
    if (!quizBody || !progress) return;

    const q = questions[currentIndex];
    progress.style.width =` ${(currentIndex / questions.length) * 100}% `;

    if (q.type === "mcq" || q.type === "tf") {
        quizBody.innerHTML = `
            <div class="question-title">${q.question}</div>
            <div class="options-grid">
                ${q.options.map((opt, i) => `<button class="option-btn" onclick="checkAnswer(${i})">${opt}</button>`).join('')}
            </div>
        ;`
    } else if (q.type === "essay") {
        quizBody.innerHTML = `
            <div class="question-title">${q.question}</div>
            <div class="essay-box">
                <textarea placeholder="اكتب إجابتك هنا بأسلوبك..."></textarea>
                <button class="btn-action" onclick="showEssayAnswer()">التحقق من الإجابة</button>
            </div>
            <div class="essay-answer" id="essay-ans">${q.modelAnswer}</div>
            <button class="btn-action" id="next-btn" style="display:none; margin-top:15px;" onclick="nextQuestion()">السؤال التالي ➔</button>
        ;`
    }
}

function checkAnswer(selectedIndex) {
    const q = questions[currentIndex];
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) {
            btn.classList.add('correct');
        }
        if (i === selectedIndex && i !== q.correct) {
            btn.classList.add('wrong');
        }
    });

    if (selectedIndex === q.correct) {
        score++;
    }

    setTimeout(() => {
        nextQuestion();
    }, 1200);
}

function showEssayAnswer() {
    document.getElementById("essay-ans").style.display = "block";
    document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("progress").style.width = "100%";
    const quizBody = document.getElementById("quiz-body");
    quizBody.innerHTML = `
        <div class="score-box">
            <h2>🎉 أحسنت! اكتمل الاختبار</h2>
            <p style="font-size: 1.2rem; margin-bottom: 15px;">نتيجة الأسئلة الموضوعية: <strong>${score} من 6</strong></p>
            <button class="btn-action" style="float:none;" onclick="location.reload()">إعادة اللعبة 🔄</button>
        </div>
    ;`
}

document.addEventListener("DOMContentLoaded", () => {
    renderQuestion();
});