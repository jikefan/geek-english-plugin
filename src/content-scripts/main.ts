import md5 from 'js-md5';
// import { createApp, DefineComponent } from "vue";
// import Popup from "./Popup.vue";

// const MOUNT_EL_ID = "attonex_clipper";

// let mountEl = document.getElementById(MOUNT_EL_ID);
// if (mountEl) {
//     mountEl.innerHTML = "";
// }
// mountEl = document.createElement("div");
// mountEl.setAttribute("id", MOUNT_EL_ID);
// document.body.appendChild(mountEl);
// const vm = createApp(Popup).mount(mountEl);
console.log('Geek English content-js started!');

interface GlobalVariable {
    selectedWords: string;
    selectedEle: Element | null;
}

let globalVariable: GlobalVariable = {
    selectedWords: '',
    selectedEle: null
}

const translate = async words => {
    const q = words
    try {
        const rs = await fetch(`http://localhost:8080/translate?question=${q}`)
        if (!rs.ok) {
            throw new Error('网络请求错误: ' + rs.status);
        }

        const data = await rs.json()
        const translateResult = JSON.parse(data.result).trans_result[0].dst
        return translateResult as string
        
    } catch(err) {
        console.log(err);
    }
}

// 处理鼠标点击事件
function handleMouseUp(event) {
    // 获取选中的文本
    const selectedText = window.getSelection()?.toString().trim()

    globalVariable.selectedWords = selectedText ?? ''
    
    // 处理选中的元素
    let element = document.elementFromPoint(event.clientX, event.clientY) 
    globalVariable.selectedEle = element
}

function stressElement(ele: Element, stressText: string, transText: string) {
    // 取出原来元素的内容
    const originContent = ele.innerHTML
    const stressStyle = `
        color: white;
        padding: 3px 5px 3px 5px;
        border-radius: 5px;
        background-color: #d0a8ff;
    `
    const stressEleId = Math.round(Math.random() * 100)

    const newContent = originContent.replace(stressText, `<span id="${stressEleId}" style="${stressStyle}">${stressText}</span>`)
    ele.innerHTML = newContent

    const addedEle = document.getElementById(`${stressEleId}`);
    addedEle?.addEventListener('mouseenter', () => {
        addedEle.innerHTML = transText
    })
    addedEle?.addEventListener('mouseleave', () => {
        addedEle.innerHTML = stressText
    })
}

const keyEvent_Alt_T = async (event) => {
    // 判断是否按下了Alt键（keyCode为18）和字母T键（keyCode为84）
    if (event.altKey && event.keyCode === 84) {
        // 在这里执行按下Alt+T时的操作
        if (globalVariable.selectedWords == '') return

        const rs = await translate(globalVariable.selectedWords)

        if (null != globalVariable.selectedEle && rs != null) {
            stressElement(globalVariable.selectedEle, globalVariable.selectedWords, rs)
        }
    }
}



// 添加鼠标点击事件监听器
document.addEventListener("mouseup", handleMouseUp);

// 添加键盘事件监听器
document.addEventListener("keydown", keyEvent_Alt_T);