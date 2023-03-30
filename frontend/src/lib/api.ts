import {API_URL}  from './constants';

async function send({ method, path, data }) {
	const opts : RequestInit = { method, headers: {} };

    opts.headers['Content-Type'] = 'application/json';
    opts.headers['Accept'] = 'application/json';
	if (data) {
		opts.body = JSON.stringify(data);
	}

	const res = await fetch(`${API_URL}/${path}`, opts);
	if (res.ok || res.status === 422) {
		const text = await res.text();
        return text ? JSON.parse(text) : {};
	}

    throw new Error(res.statusText);
}

export function get(path) {
	return send({ method: 'GET', path, data: null });
}

export function del(path) {
	return send({ method: 'DELETE', path, data: null });
}

export function post(path, data) {
	return send({ method: 'POST', path, data });
}

export function put(path, data) {
	return send({ method: 'PUT', path, data });
}