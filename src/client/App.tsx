import * as React from 'react';

const App = (props: AppProps) => {
	const [users, setUsers] = React.useState<{ id: number; email: string; created_at: Date }[]>([]);
	const [email, setEmail] = React.useState<string>('');
	const [count, setCount] = React.useState<number>(0);

	const getUsers = React.useCallback(async () => {
		const res = await fetch('/api/users');
		const users = await res.json();
		setUsers(users);
	}, []);

	const getCount = React.useCallback(async () => {
		const res = await fetch('/api/users/count');
		const pizza = await res.json();
		setCount(pizza.count);
	}, []);

	React.useEffect(() => {
		getUsers();
		getCount();
	}, [getUsers]);

	const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const res = await fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});
		if (res.ok) {
			const result = await res.json();
			console.log(result);
			getUsers();
			getCount();
		}
		setEmail('');
	};

	return (
		<main className="container">
			<section className="row justify-content-center mt-5">
				<div className="col-10 text-center">
					<h1 className="display-1">Join Our Cult Today!</h1>
					<p className="text-muted">Just look at all {count} saps .. I mean users!</p>
				</div>
				<div className="col-md-5">
					<form className="form-group p-3">
						<input
							value={email}
							onChange={e => setEmail(e.target.value)}
							type="email"
							className="form-control"
						/>
						<button
							onClick={handleRegister}
							className="btn btn-outline-primary btn-block w-50 mx-auto mt-3">
							Join Now!
						</button>
					</form>
				</div>
				<div className="col-md-7">
					<ul className="list-group list-group-flush">
						{users.map(user => (
							<li
								key={user.id}
								className="list-group-item py-3 d-flex justify-content-center">
								<span>{user.email}</span>
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
};

type AppProps = {};

export default App;
