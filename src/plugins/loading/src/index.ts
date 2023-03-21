/**
 * @author hxk
 * @link	链接
 * @namespace	Loading
 * @return	Loading
 * @param data	Object 
 * @version 1.0
 */

const defaultCor = {
    bgColor: 'rgba(0, 0, 0, 0.1)',
    text: 'loading',
    // type: 'text',
    type: 'roll-circular',
    color: 'black'
}

const typeMap = {
    'roll-circular': {
        id: 'roll-circular',
        innerHTML:  `<svg class="circular" viewbox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" />
        </svg>`,
        style: {
            stroke: 'black'
        }
    },
    'default': {
        id: 'roll-circular',
        innerHTML:  `<svg class="circular" viewbox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" />
        </svg>`
    },
}

export default class Loading {

    loading: HTMLElement
    body: HTMLElement
    loadingCount: number = 0
    static _instance

    constructor(data){
        if(new.target !== Loading){
            return
        }
        if(!Loading._instance){
            data = Object.assign(data || {}, defaultCor) 
            this._init(data)
            Loading._instance = this
        }
        return Loading._instance
    }

    _init(data) {
        console.log('_init');
        
        this.loading = document.createElement('div')
        this.body = document.querySelector('body')
        this.loading.id = 'hxk-loading'
        this.loading.style.backgroundColor = data.bgColor
        
        this.initContent(data)
    }

    initContent(data) {
        const node = document.createElement('div')
        const type = data.type
        const contentCor = typeMap[type] || typeMap['default']

        for(let key of  Object.keys(contentCor)) {
            if(key == 'style') {
                let contentCorStyle = contentCor['style']
                for(let styleKey of  Object.keys(contentCorStyle)) {
                    node['style'][styleKey] = contentCorStyle[styleKey]
                }
                continue
            }
            node[key] = contentCor[key]
        }
        this.loading.appendChild(node)
    }

    showLoading (){
        if(this.loadingCount) return 
        this.body.appendChild(this.loading)
        this.loadingCount++
    }

    hideLoading (){
        if(!this.loadingCount) return 
        this.body.removeChild(this.loading)
        this.loadingCount--
    }
}