<template>
  <div class="button-list">
    <label v-for="(sensor, index) in sensors" :key="index">
      <input type="checkbox" v-model="selectedButtons" :value="sensor.label">
      {{ sensor.label }}
    </label>
  </div>
  <div class="layout df">
    <div class="navs fn df fdc">
      <div v-for="(sensor, index) in sensors" :key="index" v-show="isSelected(sensor.label)" class="list-item"
           :class="{ active: sensor.active, alternate: sensor.alternate,status:sensor.status }">
        <div class="sensor-label">{{ sensor.label }}</div>
        <div class="sensor-value">{{ sensor.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tom",
  data() {
    return {
      sensors: [
        { label: "开机按钮按下状态", value: "-1", active: false, alternate: false, status: false },
        { label: "AC-DC输出端采样电压", value: "-1", active: false, alternate: false, status: false },
        { label: "（霍尔传感器1）到位状态", value: "-1", active: false, alternate: false, status: false },
        { label: "（霍尔传感器2）到位状态", value: "-1", active: false, alternate: false, status: false },
        { label: "大量程称重传感器读数：单位g", value: "-1", active: false, alternate: false, status: false },
        { label: "小量程称重传感器读数：单位g", value: "-1", active: false, alternate: false, status: false },
        { label: "RFID_INFO", value: "-1", active: false, alternate: false, status: false },
        { label: "RFID_MsgHead", value: "-1", active: false, alternate: false, status: false },
        { label: "Encoder01", value: "-1", active: false, alternate: false, status: false },
        { label: "Encoder02", value: "-1", active: false, alternate: false, status: false },
        { label: "Encoder03", value: "-1", active: false, alternate: false, status: false },
        { label: "Encoder04", value: "-1", active: false, alternate: false, status: false },
        { label: "Encoder05", value: "-1", active: false, alternate: false, status: false },
        { label: "Encoder06", value: "-1", active: false, alternate: false, status: false },
        { label: "Encoder07", value: "-1", active: false, alternate: false, status: false }
      ],
      selectedButtons: []

    };
  },

  mounted() {
    this.selectedButtons = this.sensors.map(sensor => sensor.label);

    try {
      const socket = new WebSocket("ws://127.0.0.1:8088/websocket");

      socket.onopen = () => {
        console.log("WebSocket connection opened.");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.updateButtonStatus(data);
      };

      socket.onclose = (event) => {
        console.error("WebSocket connection closed:", event);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Failed to initialize WebSocket:", error);
    }
  },

  methods: {
    updateButtonStatus(data) {
      if (data.code === 300 && data.msg) {
        try {
          const {变化字段, 变化前的值, 变化后的值, 状态} = data.msg;
          console.log(变化字段)
          console.log(变化前的值)
          console.log(变化后的值)
          console.log(状态)

          this.sensors.forEach((sensor) => {
            if (sensor.label === 变化字段) {
              sensor.value = `变化前: ${变化前的值}, 变化后: ${变化后的值}`;
              sensor.alternate = true;
              if (状态 !== null) {
                if (状态 === '不正常') {
                  sensor.status = true;
                } else if (状态 === '正常') {
                  sensor.status = false;
                }
              }
              setTimeout(() => {
                sensor.active = true;
                setTimeout(() => {
                  sensor.active = false;
                }, 100);
              }, 0);
            }
          });
        } catch (error) {
          console.error('Failed to parse message:', error);
        }
      }
    },
    isSelected(label) {
      return this.selectedButtons.includes(label);
    }
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  width: 150px;
  height: 100px;
  margin-left: 30px;
  margin-bottom: 30px;
  border: 1px solid #333;
  border-radius: 10px;
  background: #999999;
  padding: 10px;
  color: #fff;

  &.alternate {
    background: green;
  }

  &.active {
    background: blue;
  }
  &.status {
    background: red;
  }
}

.layout {
  height: 100%;
  width: 100%;
}

.navs {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 10px;

  button {
    height: 140px;
    color: red;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .sensor-label {
      margin-bottom: 5px; /* Adjust the margin as needed */
    }

    .sensor-value {
      font-size: 14px; /* Adjust the font size as needed */
    }

    &.active {
      background: blue;
    }

    &.alternate {
      background: green;
    }
  }

  .router-link-active {
    background: firebrick !important;
  }
}
</style>
