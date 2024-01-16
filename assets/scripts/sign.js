class Animations {
    constructor(params = {}) {
        Object.assign(this, params);
        this.init();
    }

    parameters() {
        this.signPages = {
            signUp: {
                form: `
                    <div>
                        <div class="slide-in">
                            <h1>Building your future home,</h1>
                        </div>
                        <div class="slide-in">
                            <h1>One sign-up at a time</h1>
                        </div>
                    </div>
                    <div class="slide-in">
                        <input type="text" name="fullname" id="fullname" placeholder="Enter your fullname">
                    </div>
                    <div class="slide-in">
                        <input type="text" name="email" id="email" placeholder="Enter your email">
                    </div>
                    <div class="slide-in">
                        <input type="text" name="pass" id="pass" placeholder="Enter your password">
                    </div>
                    <div class="form-actions flex slide-in">
                        <button class="arrow" href="/">
                            <div class="sign-arrow flex center">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                            <div class="sign-text">
                                sign in
                            </div>
                        </button>
                        <a class="wide" href="/home">sign up</a>
                    </div>
                `,
                quote: "Home awaits. Start your journey now."
            },
            signIn: {
                form: `
                    <div>
                        <div class="slide-in">
                            <h1>Unlocking the</h1>
                        </div>
                        <div class="slide-in">
                            <h1>doors to your dream home</h1>
                        </div>
                    </div>
                    <div class="slide-in">
                        <input type="text" name="email" id="email" placeholder="Enter your email">
                    </div>
                    <div class="slide-in">
                        <input type="text" name="pass" id="pass" placeholder="Enter your password">
                    </div>
                    <div class="form-actions flex slide-in">
                    <button class="arrow" href="/">
                        <div class="sign-arrow flex center">
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                        <div class="sign-text">
                            sign up
                        </div>
                    </button>
                        <a class="wide" href="/home">sign in</a>
                    </div>
                `,
                quote: "Every home tells a story: yours begins here."
            }
        }
    }

    init() {
        this.parameters();

        const tl = gsap.timeline();
        const type = this?.type;

        if (!type) return tl;

        tl.call(() => Methods.disableLinksAndBtns(true));

        if (type == 'slide') {
            const slide = this.slide();
            tl.add(slide);
        };

        tl.call(() => Methods.disableLinksAndBtns());
    }

    //Animations
    slide() {
        const slideTl = gsap.timeline();
        const currentElements = selectAll(".slide-in > *");
        const quote = selectAll(".quote")
        const quoteText = select(".quote p");

        const formBox = select(".form-box");
        const type = formBox.dataset?.form;
        const text = (type == 'signin') ? this.signPages.signUp.form : this.signPages.signIn.form;

        if (!currentElements.length) return slideTl;

        slideTl
            .to(currentElements, { yPercent: -100, stagger: 0.1, duration: 0.5, opacity: 0, ease: "Back.easeIn" })
            .to(quote, { opacity: 0 }, "<")

            .call(() => {
                select(".form-box .form").remove();

                Methods.insertToDOM({ type: "div", text, parent: formBox, before: selectWith(formBox, ".quote"), classes: ["form", "flex", "hidden"] })
                formBox.dataset.form = (type == 'signin') ? 'signup' : 'signin';

                this.slideIn({ quote, quoteText, type })
            })

        return slideTl;
    }

    slideIn(params = {}) {
        const slideInTl = gsap.timeline();
        const { quote, quoteText, type } = params;
        const text = (type == 'signin') ? this.signPages.signUp.quote : this.signPages.signIn.quote;

        slideInTl
            .set(".slide-in > *", { yPercent: 100, opacity: 0 })

            .call(() => {
                quoteText.innerHTML = text;
                select(".form")?.classList.remove("hidden");
            })

            .to(".slide-in > *", { yPercent: 0, stagger: 0.1, duration: 0.5, opacity: 1, ease: "Back.easeOut" })
            .to(quote, { opacity: 1 }, "<")

            .call(() => PageSetup.assignBtn())
    }
}

class PageSetup {
    constructor(params = {}) {
        Object.assign(this, params);
        this.init();
    }

    init() {
        const device = Methods.checkDeviceType();
        const tl = gsap.timeline();

        //Assign button that changes the form
        PageSetup.assignBtn();

        tl
            .set(".form-img img", { opacity: 0 })
            .set(".form-img", { opacity: 0 })
            .set(".slide-in > *", { yPercent: 100, opacity: 0 })
            .set(".quote", { opacity: 0 })
            
            .to("loader", { display: "none" })
            .to(".slide-in > *", { yPercent: 0, opacity: 1, stagger: 0.1, ease: "Back.easeOut" })
            .to(".form-img", { opacity: 1 }, "<")
            .to(".quote", { opacity: 1 }, "<")
            .call(() => {
                if (device != "mobile") {
                    //Commence the slider animation
                    const methods = new Methods({ holder: select(".form-img"), max: 7 });
                    methods.initializeSlider();
                }
            })
    }

    static assignBtn() {
        select(".form button.arrow").addEventListener("click", () => new Animations({ type: 'slide' }));
    }
}

new PageSetup();