
import imgSrc from './my.jpg'

var app = {
	data(){
		return {
			imgSrc:imgSrc
		}
	},
	template:`
		<div>
			<img :src="imgSrc" alt="我的女朋友" />

		</div>
	`
};
export default app;