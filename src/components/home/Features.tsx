import './features.css'

export function Features() {
    return (
        <ul className="flex justify-center items-center mb-10 mt-20 container mx-auto gap-5">
            <li className="step relative">
                <div className="step-icon bg-[#00b0bd40] rounded-full flex items-center justify-center w-12 h-12">
                    <img src="https://teratech.shop/_nuxt/img/icon-free-delivery.e9e72ac.svg"/>
                </div>
                <span className="step-title font-bold text-secondary text-xs">ارسال سریع</span>
            </li>
            <li className="step-line"></li>

            <li className="step relative">
                <div className="step-icon bg-[#00b0bd40] rounded-full flex items-center justify-center w-12 h-12">
                    <img src="https://teratech.shop/_nuxt/img/icon-free-delivery.e9e72ac.svg"/>
                </div>
                <span className="step-title font-bold text-secondary text-xs">تحویل در همان روز</span>
            </li>
            <li className="step-line"></li>

            <li className="step relative">
                <div className="step-icon bg-[#00b0bd40] rounded-full flex items-center justify-center w-12 h-12">
                    <img src="https://teratech.shop/_nuxt/img/icon-free-delivery.e9e72ac.svg"/>
                </div>
                <span className="step-title font-bold text-secondary text-xs">امکان خرید قسطی</span>
            </li>
            <li className="step-line"></li>

            <li className="step relative">
                <div className="step-icon bg-[#00b0bd40] rounded-full flex items-center justify-center w-12 h-12">
                    <img src="https://teratech.shop/_nuxt/img/icon-free-delivery.e9e72ac.svg"/>
                </div>
                <span className="step-title font-bold text-secondary text-xs">تحویل به صورت حضوری</span>
            </li>


        </ul>
);
}
