import { Event } from "src/base-class/Event";
import { TypingData } from "../interface";

const defaultData: Omit<TypingData, "elm"> & { elm?: string } = {
	strings: ['默认打字'],
	startDelaySpeed: 200,
	deleteSpeed: 100,
	shouldDelete: false,
	sleepTime: 2000,
};

/**
 * @author hxk
 * @link	链接
 * @namespace	Typing
 * @return	null
 * @param data	TypingData 生成打字效果需要的配置
 * @version 1.0
 */
export default class Typing extends Event {
	data: TypingData;
	isStopWriting: Boolean = false;
	constructor(data: TypingData) {
		super();
		this.data = Object.assign(defaultData, data);
		console.log(this.data);
		this._init();
	}

	_init() {
		const data = this.data;
		let callBackText = " ";
		let textIndex = 0;
		if(typeof data.strings == 'string') {
			data.strings = [data.strings]
		}
		let text =
			(Array.isArray(data.strings) &&
				data.strings[textIndex].split("")) ||
			(data.strings = ["strings must be Array"])[0];
		let index = 0;
		let state = "typing";
		let timer = null;

		const changeTextIndex = () => {
			if (++textIndex > data.strings.length - 1) {
				textIndex = 0;
			}
			text = data.strings[textIndex].split("");
		};

		const writing = async index => {
			clearTimeout(timer);
			if (state == "typing") {
				if (index < text.length) {
					callBackText += text[index];
					this.textNodeChange(callBackText);
					++index;
				} else {
					await this.sleep(data.sleepTime);
					if (data.shouldDelete) {
						state = "delete";
					} else {
						callBackText = " ";
						this.textNodeChange(callBackText);
						index = 0;
						changeTextIndex();
					}
				}
			} else if (state == "delete") {
				if (index > 0) {
					let textArr = callBackText.split("");
					textArr.length = textArr.length - 1;
					callBackText = textArr.join("");
					this.textNodeChange(callBackText);
					--index;
				} else {
					state = "typing";
					changeTextIndex();
				}
			}
			let speed =
				state == "typing" ? data.startDelaySpeed : data.deleteSpeed;
			timer = this.isStopWriting ? null : setTimeout(() => writing(index), speed);
		};

		writing(index);
	}

	stopWriting(){
		this.isStopWriting = true
	}

	startWriting(){
		this.isStopWriting = false
	}

	textNodeChange(text) {
		if (this.data.changeCallback) {
			this.data.changeCallback &&
				typeof this.data.changeCallback == "function" &&
				this.data.changeCallback(text);
		} else if (window && document) {
			const dom: HTMLElement =
				document && document.querySelector(this.data.elm);
			if (!dom) {
				console.log("elm is no definition");
				return;
			}
			dom.innerHTML = text;
		} else {
			throw Error("elm and changeCallback all is no definition");
		}
	}

	sleep(time) {
		return new Promise(resolve => setTimeout(resolve, time));
	}
}
