document.addEventListener("DOMContentLoaded", () => {
  // 1. Мобильное меню
  const burgerBtn = document.getElementById("burgerBtn");
  const navMenu = document.getElementById("navMenu");

  if (burgerBtn && navMenu) {
    burgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => navMenu.classList.remove("active"));
    });
  }

  // 2. Демо-переключатель LED-лампы на карточке павербанка
  const toggleLampBtn = document.getElementById("toggleLampBtn");
  const productCard = document.getElementById("productCard");

  if (toggleLampBtn && productCard) {
    toggleLampBtn.addEventListener("click", () => {
      const isActive = productCard.classList.toggle("lamp-active");
      toggleLampBtn.classList.toggle("active", isActive);
      toggleLampBtn.textContent = isActive
        ? "Выключить LED-лампу"
        : "Включить LED-лампу";
    });
  }

  // 3. Калькулятор автономности 50 000 mAh
  const calcData = {
    phone: {
      value: "9–11 раз",
      desc: "Полных циклов зарядки стандартного смартфона (аккумулятор 4000–5000 mAh)."
    },
    router: {
      value: "35–45 часов",
      desc: "Непрерывного питания домашнего Wi-Fi роутера + оптического терминала ONU через кабель USB-DC."
    },
    tablet: {
      value: "4–5 раз",
      desc: "Полных зарядок планшета с поддержкой быстрой зарядки через Type-C PD 20W."
    },
    lamp: {
      value: "до 70 часов",
      desc: "Непрерывного свечения встроенной светодиодной панели в режиме настольного светильника."
    }
  };

  const calcTabs = document.querySelectorAll(".calc-tab");
  const calcValue = document.getElementById("calcValue");
  const calcDesc = document.getElementById("calcDesc");

  calcTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      calcTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const device = tab.dataset.device;
      if (calcData[device] && calcValue && calcDesc) {
        calcValue.textContent = calcData[device].value;
        calcDesc.textContent = calcData[device].desc;
      }
    });
  });

  // 4. Аккордеон с вопросами (FAQ)
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (questionBtn && answer) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.toggle("open");
        answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : "0px";
      });
    }
  });

  // 5. Расчёт стоимости в форме заказа и отправка заявки
  const quantitySelect = document.getElementById("quantitySelect");
  const totalPriceDisplay = document.getElementById("totalPriceDisplay");
  const orderForm = document.getElementById("orderForm");
  const formStatus = document.getElementById("formStatus");

  const prices = {
    "1": "999 грн",
    "2": "1 890 грн",
    "3": "2 750 грн",
    "opt": "Индивидуальный прайс"
  };

  if (quantitySelect && totalPriceDisplay) {
    quantitySelect.addEventListener("change", () => {
      const val = quantitySelect.value;
      totalPriceDisplay.textContent = prices[val] || "999 грн";
    });
  }

  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(orderForm);
      const orderPayload = {
        product: "Power Bank 50000 mAh Quick Charge 22.5W",
        name: formData.get("name"),
        phone: formData.get("phone"),
        city: formData.get("city"),
        quantity: formData.get("quantity"),
        total: totalPriceDisplay ? totalPriceDisplay.textContent : "999 грн",
        timestamp: new Date().toISOString()
      };

      console.log("Заявка сформирована:", orderPayload);

      if (formStatus) {
        formStatus.hidden = false;
        formStatus.textContent = `Спасибо, ${orderPayload.name}! Заказ принят, мы свяжемся с вами по номеру ${orderPayload.phone}.`;
      }

      orderForm.reset();
      if (totalPriceDisplay) totalPriceDisplay.textContent = "999 грн";
    });
  }
});
