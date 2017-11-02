export const Util: any = {
    Animation: {
        requestInterval: (fn: (time: number) => void, delay: number = 16) => {
            const handle: any = { value: new Object() };
            let start: number = new Date().getTime();
            const loop: () => void = () => {
                const current: number = new Date().getTime();
                const delta: number = current - start;
                if (delta >= delay) {
                    fn.call(this, current);
                    start = new Date().getTime();
                }

                if (handle.value) {
                    handle.value = requestAnimationFrame(loop);
                }
            };
            handle.value = requestAnimationFrame(loop);
            return handle;
        },

        cancelInterval: (handle: any) => {
            cancelAnimationFrame(handle.value);
            handle.value = null;
        }
    }
};
