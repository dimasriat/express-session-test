const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "ngelundasku" }));

const auth_midw = (req, res, next) => {
	if (!req.session.isLoggedIn) {
		res.redirect("/loginPage");
	} else {
		next();
	}
};

app.get("/", (req, res) => {
	res.send(
		`<div>
			<h1>Welcome</h1>
			<p><b>STATUS: ${req.session.isLoggedIn ? "UDAH MASUK" : "BELUM MASUK"}</b></p>
			<p>${
				req.session.isLoggedIn
					? `<a href="/logout">Logout</a>`
					: `<a href="/login">Login</a>`
			}</p>
			<p><a href="/secret">View Secret Page</a></p>
		</div>`
	);
});
app.get("/secret", auth_midw, (req, res) => {
	res.send(
		`<div>
			<p>Allays Larasati</p>
			<p style="color: gray">${JSON.stringify(req.session)}</p>
			<p><a href="/">Menu</a></p>
		</div>`
	);
});
app.get("/login", (req, res) => {
	req.session.isLoggedIn = true;
	res.send(
		`<div>
			<h1>Alhamdulillah udah login</h1>
			<p><a href="/">Menu</a></p>
		</div>`
	);
});
app.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) throw err;
		return res.send(
			`<div>
				<h1>yess dah keluar mantap anjing</h1>
				<p><a href="/">Menu</a></p>
			</div>`
		);
	});
});
app.get("/loginPage", (req, res) => {
	res.send(
		`<div>
			<h1>WAJIB LOGIN</h1>
			<p><a href="/">Menu</a></p>
			<p><a href="/login">Login</a></p>
		</div>`
	);
});

app.listen(8000, (err) => {
	if (err) throw err;
	console.log("the backend powers at http://localhost:8000/");
});
