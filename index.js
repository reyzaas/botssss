const { 
    TOKEN,
    CHAT_SPAM, 
    GROUP_ID,
    BTN_TEXT,
    HELLO_TEXT,
    TIME
} = require("./config");

const { VK, Keyboard } = require("vk-io");
const vk = new VK({
    token: TOKEN,
    apiMode: "parallel",
    pollingGroupId: GROUP_ID
});

vk.updates.use(async (ctx, next) => {
    if (ctx.is("message") && ctx.isOutbox) {
        return;
    }

    if (ctx.isChat) {
        setInterval(() => {
            ctx.send({
                message: CHAT_SPAM,
                keyboard: Keyboard.keyboard(
                    Array(10).fill().map(() => 
                        Array(4).fill().map(() => button(randomFromArray(BTN_TEXT)))
                    )
                )
            });
        }, TIME);
    }

    return ctx.send(HELLO_TEXT);
});

vk.updates.startPolling()
.then(() => console.log(`Bot is started`));

const randomInt = (x, y) => y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
const randomFromArray = (array) => array[randomInt(array.length - 1)];
const button = (label) => {
    return Keyboard.textButton({
        label, color: Keyboard[randomFromArray(["POSITIVE_COLOR", "DEFAULT_COLOR", "PRIMARY_COLOR", "NEGATIVE_COLOR"])]
    });
}