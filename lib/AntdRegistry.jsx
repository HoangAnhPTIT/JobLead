"use client";

import React, { useMemo, useRef } from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";

const StyledComponentsRegistry = ({ children }) => {
	const cache = useMemo(() => createCache(), []);
	const isServerInserted = useRef(false);
	useServerInsertedHTML(() => {
		// avoid duplicate css insert
		if (isServerInserted.current) {
			return;
		}
		isServerInserted.current = true;
		return (
			<style
				id="antd"
				dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
			/>
		);
	});
	return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;
