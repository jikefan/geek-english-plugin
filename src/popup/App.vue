<!-- popup -->
<script setup lang="ts">
function openSetting() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options/index.html'));
    }
}
</script>

<template>
    <div class="popup">
        <div style="font-size: 16px;font-weight: bolder;text-align: center;">Geek English</div>
        <div>
            <button type="button" @click="openSetting">设置</button>
        </div>
    </div>
</template>

<style>
.popup {
    display: flex;
    width: 300px;
}
</style>