import { useEffect } from 'react'

const YotpoRewards = () => {
  const createScripts = () => {
    const yotpoInitScript = document.createElement('script')

    yotpoInitScript.id = 'yotpoInit'
    yotpoInitScript.src = 'https://cdn-widgetsrepository.yotpo.com/v1/loader/BD6EtNJMM9btDBC6ejjeCQ'
    yotpoInitScript.async = true

    document.body.appendChild(yotpoInitScript)
  }

  const destroyScripts = () => {
    const initScript = document.getElementById('yotpoInit')

    if (initScript) {
      initScript.remove()
    }
  }

  useEffect(() => {
    if (document.getElementById('yotpoInit')) {
      destroyScripts()
      createScripts()
    } else {
      createScripts()
    }
  }, [])

  return <div className="yotpo-widget-instance" data-yotpo-instance-id="24942"></div>
}

export default YotpoRewards
