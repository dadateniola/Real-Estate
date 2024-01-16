const body = document.body;
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
const selectWith = (p, e) => p.querySelector(e);
const selectAllWith = (p, e) => p.querySelectorAll(e);
const create = (e) => document.createElement(e);
const root = (e) => getComputedStyle(select(":root")).getPropertyValue(e);
const getStyle = (e, style) => window.getComputedStyle(e)[style];


//Register Scrolltrigger
gsap.registerPlugin(ScrollTrigger);


var active = true;
//Global methods
class Methods {
    constructor(params = {}) {
        Object.assign(this, params);

        return this;
    }

    //Statics
    static insertToDOM(params = {}) {
        const { type, text, parent, before, classes } = params;

        if (!type || !parent) return null;

        //Insert element contents
        const element = create(type);

        if (text) {
            if (type == "img") element.src = text;
            else element.innerHTML = text;
        }

        //Add classes
        if (classes?.length) {
            if (Array.isArray(classes)) classes.forEach(c => element.classList.add(c));
            else element.classList.add(classes);
        }

        //Append element to parent
        if (before) parent.insertBefore(element, before);
        else parent.appendChild(element);
    }

    static checkDeviceType() {
        const mobileThreshold = 768;
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (isTouchDevice && screenWidth <= mobileThreshold) {
            return "mobile";
        } else {
            return "pc";
        }
    }

    static preventDefault = (event) => event.preventDefault();
    static disableLinksAndBtns(condition = false) {
        selectAll('a, button').forEach((element) => {
            if (condition) {
                element.setAttribute('disabled', 'true');

                if (element.tagName === 'A') {
                    element.dataset.href = element.href;
                    element.addEventListener('click', Methods.preventDefault);
                }
            } else {
                selectAll('a, button').forEach((element) => {
                    element.removeAttribute('disabled');

                    if (element.tagName === 'A') {
                        if(element.dataset?.href) element.setAttribute('href', element.dataset.href);
                        element.removeEventListener('click', Methods.preventDefault);
                    }
                });
            }
        });
    }


    //Slider
    initializeSlider() {
        if (!this?.holder) return null;

        this.pagination();
        this.startSlider();
    }

    startSlider() {
        //Parameters: { holder: (parent element), max: (maximum number of images) }

        const holder = this?.holder;
        const image = selectWith(holder, "img.in-view");
        const outImage = selectWith(holder, "img:not(.in-view)");

        const max = (this?.max - 1) || 1;
        let count = parseInt(holder.dataset?.count) || 2;
        
        const paginations = selectAll(".pagination-dot");
        const currentPagination = (count - 2 <= -1) ? max : count - 2;
        const nextPagination = (currentPagination + 1 > max) ? 0 : currentPagination + 1;
        const laterPagination = (nextPagination + 1 > max) ? 0 : nextPagination + 1;
        
        const tl = gsap.timeline();

        tl
            .call(() => {
                paginations.forEach(e => e.classList.remove("active", "next", "later"))
                paginations.forEach((e, i) => {
                    const type = (currentPagination == i) ? 'active' : ((nextPagination == i) ? 'next' : ((laterPagination == i) ? 'later' : null));
                    if (type) paginations[i].classList.add(type)
                })
            })
            .to(image, { opacity: 1, ease: "none" })
            .to(image, { xPercent: -25, duration: 6.5, ease: "none" }, "<")
            .call(() => {
                outImage?.remove();
                const methods = new Methods({ holder, max: max + 1 });
                methods.startSlider();
            }, null, "-=0.5")

        Methods.insertToDOM({ type: "img", text: `/images/sign/test (${count}).jpg`, parent: holder, classes: ["hidden", "in-view"] });
        image.classList.remove("in-view");

        const newImage = selectWith(holder, "img:last-child");

        gsap.set(newImage, { opacity: 0 })

        newImage.classList.remove("hidden");

        count = (count % (max + 1) == 0) ? 1 : count + 1;
        holder.dataset.count = count;
    }

    pagination() {
        Methods.insertToDOM({ type: "div", parent: this.holder, classes: "pagination" })

        for (let i = 0; i < this.max; i++) {
            Methods.insertToDOM({ type: "div", parent: select(".pagination"), classes: "pagination-dot" })
        }
    }
}