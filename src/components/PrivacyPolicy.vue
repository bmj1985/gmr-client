<template>
  <Container>
    <div class="text-container">
      <h2>Privacy Policy</h2>
      <p>
        Your privacy is important to us. It is Golden Mountain Runners' policy
        to respect your privacy regarding any information we may collect from
        you across our website,
        <a href="http://www.goldenmountainrunners.com"
          >http://www.goldenmountainrunners.com</a
        >, and other sites we own and operate.
      </p>
      <p>
        We only ask for personal information when we truly need it to provide a
        service to you. We collect it by fair and lawful means, with your
        knowledge and consent. We also let you know why we’re collecting it and
        how it will be used.
      </p>
      <p>
        We only retain collected information for as long as necessary to provide
        you with your requested service. What data we store, we’ll protect
        within commercially acceptable means to prevent loss and theft, as well
        as unauthorized access, disclosure, copying, use or modification.
      </p>
      <p>
        We don’t share any personally identifying information publicly or with
        third-parties, except when required to by law.
      </p>
      <p>
        Our website may link to external sites that are not operated by us.
        Please be aware that we have no control over the content and practices
        of these sites, and cannot accept responsibility or liability for their
        respective privacy policies.
      </p>
      <p>
        You are free to refuse our request for your personal information, with
        the understanding that we may be unable to provide you with some of your
        desired services.
      </p>
      <p>
        Your continued use of our website will be regarded as acceptance of our
        practices around privacy and personal information. If you have any
        questions about how we handle user data and personal information, feel
        free to contact us.
      </p>
      <p>This policy is effective as of 30 January 2020.</p>
    </div>
  </Container>
</template>
<script>
import Vue from "vue"
import Container from "../UIComponents/Container"
export default Vue.extend({
  name: "Privacy Policy",
  components: { Container }
})
</script>

<style lang="scss" scoped>
.text-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: scroll;
  max-width: 800px;
  text-align: left;
  font-size: 1.1rem;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }
  p {
    margin-top: 1rem;
  }
}
</style>
