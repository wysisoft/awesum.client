<script lang="ts">
import { ItemType } from '@/itemType';
import { ref } from 'vue'
import { I18nGlobal } from '@/i18nGlobal';
import { resources } from '@/resources/Resources';

export default {
    setup() {
        return {
            ItemType,
            I18nGlobal,
            resources
        }
    }
}
</script>

<template>

    <nav aria-label="breadcrumb">
        <ol class="breadcrumb" ref="breadcrumb" style="padding:0;font-size:1.8vmin;margin-left:.5vmin">
<li class="breadcrumb-item" v-if="awesum.currentServerApp"><button v-if="awesum.currentDatabase" @click="$router.push('/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name)">{{ awesum.currentServerApp.name }}</button><span v-else>{{ awesum.currentServerApp.name }}</span></li>
<li class="breadcrumb-item" v-if="awesum.currentDatabase"><button v-if="awesum.currentItemType" @click="$router.push('/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name)">{{ awesum.currentDatabase.name }}</button><span v-else>{{ awesum.currentDatabase.name }}</span></li>
<li class="breadcrumb-item" v-if="awesum.currentItemType"><button v-if="awesum.currentDatabaseUnit" @click="$router.push('/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name+ '/' + ItemType[awesum.currentItemType.type])">{{ ItemType[awesum.currentItemType.type] }}</button><span v-else>{{ ItemType[awesum.currentItemType.type] }}</span></li>
<li class="breadcrumb-item" v-if="awesum.currentDatabaseUnit"> <button v-if="awesum.currentDatabaseItem" @click="$router.push('/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name+ '/' + ItemType[awesum.currentItemType.type]+ '/' + awesum.currentDatabaseUnit.name)">{{ awesum.currentDatabaseUnit.name }}</button><span v-else>awesum.currentDatabaseUnit.name</span></li>
<li class="breadcrumb-item" v-if="awesum.currentDatabaseItem"><span>{{ awesum.currentDatabaseItem.order }}</span></li>
</ol>
    </nav>
</template>
<style>

li.breadcrumb-item button{
background: none;
border:none;
margin:0;
padding:0;
}

li.breadcrumb-item + li.breadcrumb-item{
    padding-left:.5vmin;
}

li.breadcrumb-item + li.breadcrumb-item::before{
    padding-right:.5vmin;
}
</style>