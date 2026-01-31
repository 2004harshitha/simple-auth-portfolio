// ===== Supabase Setup =====


const supabaseUrl = "https://snijjinhsaryszirwcud.supabase.co";
const supabaseKey = "sb_publishable_Y82gqgWgpm4q3GDTpEhCqw_ZTuk1tcT";

// IMPORTANT: do NOT redeclare `supabase`
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// ===== Toggle Forms =====
function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("registerForm").classList.add("hidden");
}

function showRegister() {
  document.getElementById("registerForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
}

// Default view
showLogin();

// ===== Register =====
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    document.getElementById("registerMsg").innerText = error.message;
  } else {
    document.getElementById("registerMsg").innerText =
      "Registration successful! Please login.";
    showLogin();
  }
});

// ===== Login =====
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    document.getElementById("loginMsg").innerText = error.message;
  } else {
    // Save email for portfolio page
    localStorage.setItem("userEmail", data.user.email);
    window.location.href = "portfolio.html";
  }
});

// ===== Logout (used in portfolio.html) =====
async function logout() {
  await supabaseClient.auth.signOut();
  localStorage.clear();
  window.location.href = "index.html";
}
