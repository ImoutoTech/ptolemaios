<template>
  <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useMessage } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

defineOptions({
  name: 'SideMenu',
})

const message = useMessage();

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '且听风吟'
      ),
    key: 'hear-the-wind-sing',
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true
  },
]

const handleUpdateValue =  (key: string, item: MenuOption) => {
  message.info('[onUpdate:value]: ' + JSON.stringify(key))
  message.info('[onUpdate:value]: ' + JSON.stringify(item))
}
</script>