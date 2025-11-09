import jwt from "jsonwebtoken";

export type AccessTokenPayload = {
	userId: string;
	tgId: number;
	type: "access";
};

export type RefreshTokenPayload = {
	userId: string;
	type: "refresh";
};

export function generateAccessToken(
	userId: string,
	tgId: number,
	secret: string,
): string {
	const payload: AccessTokenPayload = {
		userId,
		tgId,
		type: "access",
	};

	return jwt.sign(payload, secret, {
		expiresIn: "15m", // 15 минут
	});
}

export function generateRefreshToken(userId: string, secret: string): string {
	const payload: RefreshTokenPayload = {
		userId,
		type: "refresh",
	};

	return jwt.sign(payload, secret, {
		expiresIn: "1d", // 1 день
	});
}

export function verifyAccessToken(
	token: string,
	secret: string,
): AccessTokenPayload {
	const decoded = jwt.verify(token, secret) as AccessTokenPayload;

	if (decoded.type !== "access") {
		throw new Error("Invalid token type");
	}

	return decoded;
}

export function verifyRefreshToken(
	token: string,
	secret: string,
): RefreshTokenPayload {
	const decoded = jwt.verify(token, secret) as RefreshTokenPayload;

	if (decoded.type !== "refresh") {
		throw new Error("Invalid token type");
	}

	return decoded;
}
