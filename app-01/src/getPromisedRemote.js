module.exports = {
    getPromisedRemote: function getPromisedRemote(remoteName, remoteUrl) {

        const getPromise = () => new Promise(resolve => {
            const getRemoteNameKey = (remoteName) => (`module-federation-override:${remoteName}`)

            const remoteName = 'REMOTE_NAME';
            const remoteUrl = 'REMOTE_URL';

            let src = remoteUrl;
            const remoteNameOverrideValue = localStorage.getItem(getRemoteNameKey(remoteName)) ?? ''
            const remotesDisabledOverride = JSON.parse(localStorage.getItem('module-federation-overrides-disabled') ?? '[]')
            const remoteNameOverrideDisabled = remotesDisabledOverride.includes(remoteName)

            if(remoteNameOverrideValue.length && !remoteNameOverrideDisabled) {
                src = remoteNameOverrideValue
            }
            if (!remoteNameOverrideValue.length  && !remoteNameOverrideDisabled){
                localStorage.setItem(getRemoteNameKey(remoteName), '')
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                const proxy = {
                    get: (request) => {
                        return window[remoteName].get(request);
                    },
                    init: (arg) => {
                        try {
                            return window[remoteName].init(arg);
                        } catch(e) {
                            console.log('remote container already initialized');
                        }
                    }
                };
                resolve(proxy);
            };
            document.head.appendChild(script);
        })

        return  `promise ${String(getPromise)
            .replace('() =>', '')
            .replace('REMOTE_NAME', remoteName)
            .replace('REMOTE_URL', remoteUrl)}`

    }
}