<template>
  <div class="run-description">
    <div class="card-header">
      <h2 class="title">Announcement</h2>
      <h3 class="trailhead-address">
        March 16th, 2020
      </h3>
    </div>
    <div class="card-content">
      <span>
        <p>
          We have been running together as a group every single Tuesday since
          the spring of 2014. It is with great sadness that I am announcing that
          this Tuesday 3/17/20 will be the first time we will not be scheduling
          a group run. While "global pandemic" would have been the last thing I
          would have ever guessed would cause our first cancelation in almost 6
          years...here we are.
        </p>
        <p>
          Right now I am only cancelling this weeks run, but I fully anticipate
          we may not have a Tuesday night run for some time to come. I will post
          new updates each week as we asses this ever evolving situation.
        </p>
        <p>
          In the meantime, although running in a large group of people is not
          advisable, GMR is not just Tuesday night runs. GMR is a community.
          While we may not be able to be in eachothers physical presence we can
          still participate in this community. Here are some ways we can keep
          together while spending time apart:
        </p>
        <ul>
          <li>
            <p>
              -- Join the
              <a
                href="https://bit.ly/gmr-strava"
                target="_blank"
                rel="noreferrer"
                >Golden Mountain Runners Strava Club</a
              >
              and go for a run around 6:15 on Tuesday evening(s). Tag GMR in the
              title of your run.
            </p>
          </li>
          <li>
            <p>
              -- Tag GMR in your run photos on
              <a
                href="https://www.instagram.com/goldenmountainrunners"
                target="_blank"
                rel="noopener"
                >Instagram</a
              >
            </p>
          </li>
          <li>
            <p>
              -- Post photos or information on the
              <a
                href="https://www.facebook.com/groups/GoldenMountainRunners/"
                target="_blank"
                >Facebook page</a
              >
              about runs you have done. Photos, recaps, route plans, trail
              conditions, etc.
            </p>
          </li>
          <li>
            <p>
              -- Continue to reach out to your friends in the group via phone,
              email or text. Let's all continue to be safe, help those around us
              who are in need and try to get through this the best we can.
            </p>
          </li>
        </ul>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  name: "COVID19"
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-header {
  display: flex;
  flex-direction: column;
}
a {
  text-decoration: none;
  color: #365899;
}

.run-description {
  margin-top: 2rem;
  padding: 0.25rem;
  height: 100%;
  width: 100%;
  line-height: 1.1;
  overflow: scroll;
  h2 {
    font-size: 1.25rem;
    text-align: center;
    font-weight: 800;
  }
  p {
    margin-top: 0.75rem;
  }
  text-align: justify;
  font-size: 1.25rem;
  box-shadow: 0;
}
.pending {
  margin-top: 3rem;
  text-align: center;
  font-size: 1.25rem;
}
.trailhead-address {
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
}
.route {
  font-size: 1.25rem;
  color: black;
}
@media only screen and (max-width: 450px) {
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.25rem;
  }
  .logo {
    height: 7rem;
    width: 7rem;
  }
  .run-description {
    &.pending {
      text-align: center;
    }
    text-align: left;
    font-size: 1.1rem;
    box-shadow: 0;
  }
  .route {
    font-size: 1rem;
  }
}
</style>
