import React from "react";
import { useStore } from "@sainui/context";

export default function Markups({ children }) {
	const { app } = useStore();
	const { direction, configuration } = app;
	const { portletInstance } = configuration;
	return (
		// Start theme wrapper
		<div
			className={`${direction} yui3-js-enabled gecko js firefox firefox78 firefox78-0 win`}
			dir={direction}
			lang="en-US"
		>
			<div className="controls-visible closed  yui3-skin-sam guest-site signed-in public-page site">
				<div className="container-fluid app app-rtl app-loaded" id="wrapper">
					<div className="columns-1" id="main-content" role="main">
						<div className="portlet-layout row">
							<div className="col-md-12 portlet-column portlet-column-only" id="column-1">
								<div
									className="portlet-dropzone portlet-column-content portlet-column-content-only"
									id="layout-column_column-1"
								>
									{/* Start portlet wrapper */}
									<div
										className="portlet-boundary portlet-boundary_id_  portlet-decorate   portlet-draggable yui3-dd-drop"
										id="p_p_id_id_INSTANCE_ax3RAFSE2fT6_"
										data-portlet-title-in-menu="الکی"
									>
										<section className="portlet" id="portlet_id_INSTANCE_ax3RAFSE2fT6">
											<div
												className="portlet-content block block-condensed block-decorate"
												id="id_INSTANCE_ax3RAFSE2fT6"
											>
												{/* children */}
												{children}
												{/* children */}
											</div>
										</section>
									</div>
									{/* End portlet wrapper */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		// End theme wrapper
	);
}
