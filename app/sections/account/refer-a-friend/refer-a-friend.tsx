import { Image } from '@shopify/hydrogen'
import { FacebookIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import Input from '@solo-brands/ui-library.ui.atomic.input'
import { Form, Formik } from 'formik'
import styles from './styles.module.css'

const ReferFriend = () => {
  //TODO: Remove after adding logic
  const media = {
    altText: 'Refer friends for $',
    width: '1502',
    height: '932',
    url: 'https://cdn-widget-assets.yotpo.com/static_assets/BD6EtNJMM9btDBC6ejjeCQ/images/image_2021_02_24_14_52_41_591',
  }

  const initialValues = {
    emailAddress: '',
  }

  return (
    <div className={styles.wrapper}>
      <Image
        data={{ altText: media?.altText, url: media?.url }}
        className={styles.media}
        width={media?.width}
        height={media?.height}
      />
      <div className={styles.contentInfo}>
        <h3 className={styles.subHeading}>Refer a friend</h3>
        <h2 className={styles.heading}>GIVE CA$15.00, GET CA$15.00</h2>
        <p className={styles.description}>
          Give CA$15.00, Get CA$15.00, when your friend makes their first purchase of CA$115.00 or
          more.
        </p>
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          <Form>
            <Input
              name="emailAddress"
              className={styles.inputContainer}
              placeholder="Friend's email address"
            />
            <button className={styles.button}>Next</button>
          </Form>
        </Formik>
        <div className={styles.icon}>
          {/*@ts-expect-error TODO: Add href to icon*/}
          <FacebookIcon size="lg" as="a" href="https://www.facebook.com/" /> Facebook
        </div>
      </div>
    </div>
  )
}

export default ReferFriend
