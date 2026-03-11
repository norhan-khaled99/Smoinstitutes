<template>
  <div class="auth-page">
    <div class="column items-center">
      <div class="company-logo">
        <div class="logo-wrapper">
            <img   :src="'https://test.caiaden.com/' + logoUrl" alt="Logo" width="141" height="40"/>
            <span > {{ site_title }}</span>
        </div>
      </div>

      <div class="login-card">
        <p class="card-title">{{ site_name }}</p>

        <div v-if="hasError" class="error-alert">
          <div class="error-message">
            <svg
              class="error-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.00005 16.2C10.9096 16.2 12.741 15.4414 14.0912 14.0912C15.4415 12.7409 16.2 10.9096 16.2 9C16.2 7.09044 15.4415 5.2591 14.0912 3.90883C12.741 2.55857 10.9096 1.8 9.00005 1.8C7.09049 1.8 5.25914 2.55857 3.90888 3.90883C2.55862 5.2591 1.80005 7.09044 1.80005 9C1.80005 10.9096 2.55862 12.7409 3.90888 14.0912C5.25914 15.4414 7.09049 16.2 9.00005 16.2ZM7.83635 6.5637C7.66661 6.39976 7.43927 6.30905 7.20329 6.3111C6.96731 6.31315 6.74158 6.4078 6.57471 6.57467C6.40784 6.74153 6.31319 6.96727 6.31114 7.20324C6.30909 7.43922 6.39981 7.66656 6.56375 7.8363L7.72745 9L6.56375 10.1637C6.47779 10.2467 6.40923 10.346 6.36206 10.4558C6.31489 10.5656 6.29006 10.6837 6.28902 10.8032C6.28798 10.9227 6.31076 11.0413 6.35601 11.1519C6.40126 11.2625 6.46809 11.363 6.55259 11.4475C6.6371 11.532 6.73758 11.5988 6.84819 11.644C6.9588 11.6893 7.07731 11.7121 7.19681 11.711C7.31631 11.71 7.43441 11.6852 7.54421 11.638C7.65402 11.5908 7.75333 11.5223 7.83635 11.4363L9.00005 10.2726L10.1637 11.4363C10.3335 11.6002 10.5608 11.691 10.7968 11.6889C11.0328 11.6869 11.2585 11.5922 11.4254 11.4253C11.5923 11.2585 11.6869 11.0327 11.689 10.7968C11.691 10.5608 11.6003 10.3334 11.4363 10.1637L10.2726 9L11.4363 7.8363C11.6003 7.66656 11.691 7.43922 11.689 7.20324C11.6869 6.96727 11.5923 6.74153 11.4254 6.57467C11.2585 6.4078 11.0328 6.31315 10.7968 6.3111C10.5608 6.30905 10.3335 6.39976 10.1637 6.5637L9.00005 7.7274L7.83635 6.5637Z"
                fill="#C81E1E"
              />
            </svg>
            <span
              ><span class="error-heading">Invalid Login:</span> Invalid
              username or password. Please try again.</span
            >
          </div>
          <svg
            class="cursor-pointer"
            @click="hasError = false"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.29303 4.293C4.48056 4.10553 4.73487 4.00021 5.00003 4.00021C5.26519 4.00021 5.5195 4.10553 5.70703 4.293L10 8.586L14.293 4.293C14.3853 4.19749 14.4956 4.1213 14.6176 4.0689C14.7396 4.01649 14.8709 3.9889 15.0036 3.98775C15.1364 3.98659 15.2681 4.01189 15.391 4.06218C15.5139 4.11246 15.6255 4.18671 15.7194 4.2806C15.8133 4.37449 15.8876 4.48615 15.9379 4.60904C15.9881 4.73194 16.0134 4.86362 16.0123 4.9964C16.0111 5.12918 15.9835 5.2604 15.9311 5.3824C15.8787 5.50441 15.8025 5.61475 15.707 5.707L11.414 10L15.707 14.293C15.8892 14.4816 15.99 14.7342 15.9877 14.9964C15.9854 15.2586 15.8803 15.5094 15.6948 15.6948C15.5094 15.8802 15.2586 15.9854 14.9964 15.9877C14.7342 15.9899 14.4816 15.8892 14.293 15.707L10 11.414L5.70703 15.707C5.51843 15.8892 5.26583 15.9899 5.00363 15.9877C4.74143 15.9854 4.49062 15.8802 4.30521 15.6948C4.1198 15.5094 4.01463 15.2586 4.01236 14.9964C4.01008 14.7342 4.11087 14.4816 4.29303 14.293L8.58603 10L4.29303 5.707C4.10556 5.51947 4.00024 5.26516 4.00024 5C4.00024 4.73483 4.10556 4.48053 4.29303 4.293Z"
              fill="#C81E1E"
            />
          </svg>
        </div>

        <q-form class="rounded-borders" @submit.prevent="login">
          <label class="field-label">Username</label>
          <q-input
            v-model="form.username"
            class="email-field"
            outlined
            placeholder="Enter Your username"
            :error="hasError"
            no-error-icon
            hide-bottom-space
          ></q-input>

          <label class="field-label">Password</label>
          <q-input
            v-model="form.password"
            :type="isPwd ? 'password' : 'text'"
            class="password-field"
            outlined
            placeholder="Enter Your Password"
            :error="hasError"
            no-error-icon
            hide-bottom-space
          >
            <template v-slot:append>
              <div class="cursor-pointer" @click="isPwd = !isPwd">
                <!-- Eye Icon (Password hidden) -->
                <svg
                  v-if="isPwd"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.2699 9.67834C20.9799 9.21834 20.6699 8.78834 20.3499 8.38834C19.9799 7.91834 19.2799 7.87834 18.8599 8.29834L15.8599 11.2983C16.0799 11.9583 16.1199 12.7183 15.9199 13.5083C15.5699 14.9183 14.4299 16.0583 13.0199 16.4083C12.2299 16.6083 11.4699 16.5683 10.8099 16.3483C10.8099 16.3483 9.37995 17.7783 8.34995 18.8083C7.84995 19.3083 8.00995 20.1883 8.67995 20.4483C9.74995 20.8583 10.8599 21.0683 11.9999 21.0683C13.7799 21.0683 15.5099 20.5483 17.0899 19.5783C18.6999 18.5783 20.1499 17.1083 21.3199 15.2383C22.2699 13.7283 22.2199 11.1883 21.2699 9.67834Z"
                    fill="#BBBBBB"
                  />
                  <path
                    d="M14.0199 10.4806L9.97989 14.5206C9.46989 14.0006 9.13989 13.2806 9.13989 12.5006C9.13989 10.9306 10.4199 9.64062 11.9999 9.64062C12.7799 9.64062 13.4999 9.97062 14.0199 10.4806Z"
                    fill="#BBBBBB"
                  />
                  <path
                    d="M18.25 6.24969L14.86 9.63969C14.13 8.89969 13.12 8.45969 12 8.45969C9.76 8.45969 7.96 10.2697 7.96 12.4997C7.96 13.6197 8.41 14.6297 9.14 15.3597L5.76 18.7497H5.75C4.64 17.8497 3.62 16.6997 2.75 15.3397C1.75 13.7697 1.75 11.2197 2.75 9.64969C3.91 7.82969 5.33 6.39969 6.91 5.41969C8.49 4.45969 10.22 3.92969 12 3.92969C14.23 3.92969 16.39 4.74969 18.25 6.24969Z"
                    fill="#BBBBBB"
                  />
                  <path
                    d="M14.8601 12.4981C14.8601 14.0681 13.5801 15.3581 12.0001 15.3581C11.9401 15.3581 11.8901 15.3581 11.8301 15.3381L14.8401 12.3281C14.8601 12.3881 14.8601 12.4381 14.8601 12.4981Z"
                    fill="#BBBBBB"
                  />
                  <path
                    d="M21.7699 2.72891C21.4699 2.42891 20.9799 2.42891 20.6799 2.72891L2.22988 21.1889C1.92988 21.4889 1.92988 21.9789 2.22988 22.2789C2.37988 22.4189 2.56988 22.4989 2.76988 22.4989C2.96988 22.4989 3.15988 22.4189 3.30988 22.2689L21.7699 3.80891C22.0799 3.50891 22.0799 3.02891 21.7699 2.72891Z"
                    fill="#BBBBBB"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
                    fill="#BBBBBB"
                  />
                  <path
                    d="M12 9.14062C10.43 9.14062 9.14999 10.4206 9.14999 12.0006C9.14999 13.5706 10.43 14.8506 12 14.8506C13.57 14.8506 14.86 13.5706 14.86 12.0006C14.86 10.4306 13.57 9.14062 12 9.14062Z"
                    fill="#BBBBBB"
                  />
                </svg>

                <!-- Crossed Eye Icon (Password visible) -->
              </div>
            </template>
          </q-input>
          <div class="col-md-12 action-btn-container">
            <q-btn type="submit" label="Login to System" class="full-width" />
          </div>
        </q-form>
      </div>
    </div>

    <!--start form -->

    <!--start form -->
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import rules from "src/config/rules";
import authServices from "../services/service.js";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    /** start object form **/
    const isPwd = ref(true);
    const hasError = ref(false);
    const form = ref({
      username: "",
      password: "",
    });

    /** end object form **/
    /** start login integration**/
    const data = ref([]);
    const parseJwt = (token) => {
      var base64Url = token.split(".")[1];

      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );
      data.value = JSON.parse(jsonPayload);
    };
    const login = () => {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (
        !form.value.username ||
        !form.value.password ||
        !emailRegex.test(form.value.username)
        // form.value.username !== "Test_Admin@local" ||
        // form.value.password !== "AAAbbb123"
      ) {
        hasError.value = true;
      } else {
        hasError.value = false;
        $q.loading.show();

        authServices
          .logIn(form.value)
          .then((res) => {
            localStorage.setItem("accessToken", res.data.access);
            router.push({ name: "students" });
            $q.loading.hide();
          })
          .catch((error) => {
            $q.notify({
              badgeStyle: "display:none",
              classes: "custom-Notify",
              textColor: "black-1",
              icon: "img:/images/Error.png",
              position: "bottom-right",
              message: error.response.data.message,
            });
            $q.loading.hide();
          });
      }
    };

    const logoUrl = ref("");
    const site_title = ref("");
    const site_name = ref("");
    const getlogo = () => {
      authServices.getLogo()
        .then((res) => {
          logoUrl.value = res.data?.data?.company.logo;
          site_title.value = res.data?.data?.company.site_title;
          site_name.value = res.data?.data?.company.name;
        })
        .catch((error) => {
          console.error("Error fetching logo:", error);
        });
    };

    onMounted(() => {
      getlogo();
    });

    /** end login integration**/
    return {
      form,
      logoUrl,
      site_title,
      site_name,
      isPwd,
      hasError,
      login,
      rules,
      parseJwt,
      data,
    };
  },
};
</script>
