<template>
  <Container>
    <div class="event-list">
      <h2>Upcoming events</h2>
      <ol>
        <li>Caleb & Kelsey Wedding</li>
      </ol>
    </div>
    <div class="route-list">
      <h2>Route List</h2>
      <ul>
        <li>Mt. Galbraith</li>
        <li>Mt Galbraith from Toad</li>
        <li>Chimney Gulch to First Road</li>
      </ul>
    </div>
    <button class="button is-primary">
      Add event
    </button>
  </Container>
</template>

<script>
import Vue from 'vue'
import Container from '@/UIComponents/Container'
export default Vue.extend({ name: 'Dashboard', components: { Container } })
</script>
