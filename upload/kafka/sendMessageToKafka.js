import KafkaConfig from "./kafka.js";

export const sendMessageToKafka = async (completeParams) => {
  console.log("got here in upload service...");
  try {
    console.log("body : ", completeParams);
    const kafkaconfig = new KafkaConfig();
    const msgs = [
      {
        key: completeParams?.Key?.toString(),
        value: JSON.stringify(completeParams),
      },
    ];
    const result = await kafkaconfig.produce("transcode", msgs);
    console.log("result of produce : ", result);
  } catch (error) {
    console.log(error);
  }
};
