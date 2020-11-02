<template>
  <div>
    <b-navbar class="custom-navbar">
      <b-img
        class="icon-img"
        src="@/assets/icons/multitaskr-logo-long-white.png"
        fluid
      />
      <b-navbar-nav>
        <b-nav-item to="/">{{ $t('dashboard') }}</b-nav-item>
        <b-nav-item to="/leads_In">{{ $t('leadsIn') }}</b-nav-item>
      </b-navbar-nav>
      <b-button class="new-deal-btn">{{ $t('newDeal') }}</b-button>

      <b-navbar-nav class="ml-auto">
        <b-avatar-group>
          <b-avatar
            src="@/assets/icons/calendar.png"
            class="i-notification"
            badge
            badge-top
            badge-offset="-0.3em"
            button
          />
          <b-avatar
            src="@/assets/icons/notification.png"
            class="i-notification"
            button
          ></b-avatar>
          <b-avatar button text="JH" class="i-avatar" />
        </b-avatar-group>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
