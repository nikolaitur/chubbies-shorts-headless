import { useLocation } from '@remix-run/react'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

const ThirdPartyScripts = () => {
  const gaTrackingId = 'GTM-WTGZ5XZ'
  const location = useLocation()

  useEffect(() => {
    TagManager.initialize({
      gtmId: gaTrackingId,
    })
  }, [])

  return (
    <>
      <script
        async
        id="gladly-init"
        dangerouslySetInnerHTML={{
          __html: `(function(c,n,i,t){var p;var s=[];var l;if(t==="PROD"||!t){l="https://cdn.gladly.com/chat-sdk/widget.js"}else if(t==="STAGING"){l="https://cdn.gladly.qa/gladly/chat-sdk/widget.js"}else{l=t}c[i]={init:function(){p=arguments;var e={then:function(t){s.push({type:"t",next:t});return e},catch:function(t){s.push({type:"c",next:t});return e}};return e}};function e(){try{var t=n.getElementsByTagName("script")[0];var e=n.createElement("script");e.async=true;e.src=l+"?q="+(new Date).getTime();t.parentNode.insertBefore(e,t)}catch(t){}}c.__onHelpAppHostReady__=function t(e){delete c.__onHelpAppHostReady__;c[i]=e;e.loaderCdn=l;if(p){var n=e.init.apply(e,p);for(var a=0;a<s.length;a++){var r=s[a];if(r.type==="t"){n=n.then(r.next)}else{n=n.catch(r.next)}}}};e()})
    (window,document,'GladlyHelpApp','PROD');window.gladlyConfig = {appId: 'chubbies.com'}`,
        }}
      ></script>

      <link rel="preconnect" href="//cdn.dynamicyield.com" />
      <link rel="preconnect" href="//st.dynamicyield.com" />
      <link rel="preconnect" href="//rcom.dynamicyield.com" />
      <link rel="dns-prefetch" href="//cdn.dynamicyield.com" />
      <link rel="dns-prefetch" href="//st.dynamicyield.com" />
      <link rel="dns-prefetch" href="//rcom.dynamicyield.com" />
      <script
        type="text/javascript"
        src="//cdn.dynamicyield.com/api/8770102/api_dynamic.js"
      ></script>
      <script
        type="text/javascript"
        src="//cdn.dynamicyield.com/api/8770102/api_static.js"
      ></script>

      <script
        type="text/javascript"
        src="//connect.nosto.com/include/shopify-770432"
        defer
      ></script>
    </>
  )
}

export default ThirdPartyScripts
